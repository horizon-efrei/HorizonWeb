import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Post } from '../posts/entities/post.entity';
import { CaslAbilityFactory } from '../shared/modules/casl/casl-ability.factory';
import { UsersModule } from '../users/users.module';
import { ClubMember } from './club-member.entity';
import { ClubsController } from './club.controller';
import { Club } from './club.entity';
import { ClubsService } from './club.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Club, ClubMember, Post]),
    UsersModule,
  ],
  controllers: [ClubsController],
  providers: [CaslAbilityFactory, ClubsService],
  exports: [ClubsService],
})
export class ClubsModule {}
