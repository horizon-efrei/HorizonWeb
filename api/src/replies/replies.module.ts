import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BadgeUnlock } from '../badges/badge-unlock.entity';
import { Badge } from '../badges/badge.entity';
import { BadgesModule } from '../badges/badges.module';
import { Post } from '../posts/entities/post.entity';
import { CaslAbilityFactory } from '../shared/modules/casl/casl-ability.factory';
import { ReplyVote } from './entities/reply-vote.entity';
import { Reply } from './entities/reply.entity';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';
import { ReplyVotesService } from './reply-votes.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Post, Reply, ReplyVote, Badge, BadgeUnlock]),
    BadgesModule,
  ],
  controllers: [RepliesController],
  providers: [CaslAbilityFactory, RepliesService, ReplyVotesService],
  exports: [RepliesService],
})
export class RepliesModule {}
