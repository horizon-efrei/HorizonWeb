import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Inject, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { RedisClientType } from 'redis';
import { config } from '../shared/configs/config';
import { REDIS } from '../shared/modules/redis/redis.constants';
import { RedisModule } from '../shared/modules/redis/redis.module';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { MyEfreiAuthGuard } from './myefrei-auth.guard';
import { buildOpenIdClient, MyEfreiStrategy } from './myefrei.strategy';

const MyEfreiStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (authService: AuthService): Promise<MyEfreiStrategy> => {
    const client = await buildOpenIdClient();
    return new MyEfreiStrategy(authService, client);
  },
  inject: [AuthService],
};

const myefreiStrategy = config.get('myefreiOidc.enabled')
  ? [MyEfreiStrategyFactory]
  : [];

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    JwtModule.register({}),
    RedisModule,
    UsersModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    MyEfreiAuthGuard,
    ...myefreiStrategy,
  ],
  exports: [JwtAuthGuard, AuthService, JwtModule, UsersModule],
})
export class AuthModule implements NestModule {
  constructor(
    @Inject(REDIS) private readonly redis: RedisClientType,
  ) {}

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(
      session({
        store: new (RedisStore(session))({ client: this.redis, logErrors: true }),
        secret: config.get('session.secret'),
        resave: false,
        saveUninitialized: false,
        cookie: {
          sameSite: true,
          httpOnly: false,
          maxAge: 60_000,
        },
      }),
    ).forRoutes('*myefrei*');
  }
}
