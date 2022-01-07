import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CaslAbilityFactory } from '../shared/modules/casl/casl-ability.factory';
import { Badge } from './badge.entity';
import { BadgesController } from './badges.controller';
import { BadgesService } from './badges.service';

@Module({
  imports: [MikroOrmModule.forFeature([Badge]), AuthModule],
  controllers: [BadgesController],
  providers: [CaslAbilityFactory, BadgesService],
  exports: [BadgesService],
})
export class BadgesModule {}
