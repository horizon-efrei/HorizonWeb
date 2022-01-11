import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Post } from '../posts/entities/post.entity';
import { CaslAbilityFactory } from '../shared/modules/casl/casl-ability.factory';
import { UsersModule } from '../users/users.module';
import { ClubMember } from './club-member.entity';
import { ClubSearchService } from './club-search.service';
import { ClubsController } from './club.controller';
import { Club } from './club.entity';
import { ClubsService } from './club.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Club, ClubMember]),
    UsersModule,
  ],
  controllers: [ClubsController],
  providers: [CaslAbilityFactory, ClubsService, ClubSearchService],
  exports: [ClubsService],
})
export class ClubsModule {}
