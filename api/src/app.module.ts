import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { apiConfig } from './config';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './users/users.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(apiConfig.get('mongoUri')),
    PostsModule,
    FilesModule
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class AppModule { }
