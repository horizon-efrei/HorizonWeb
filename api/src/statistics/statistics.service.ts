import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import { isDayBeforeYesterday } from '../shared/lib/utils/dateUtils';
import { Statistics } from './statistics.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics) private readonly statisticsRepository: BaseRepository<Statistics>,
  ) {}

  public async getAllStreaks(stats: Statistics): Promise<{
    postStreak: number;
    replyStreak: number;
    commentStreak: number;
    actionStreak: number;
  }> {
    let hasChanged = false;

    // If the user has never posted and the postStreak is not already 0,
    // OR if the user has posted but too long ago, reset the postStreak to 0
    if ((!stats.lastPost && stats.postStreak !== 0)
      || (stats.lastPost && isDayBeforeYesterday(stats.lastPost))) {
      stats.postStreak = 0;
      hasChanged = true;
    }

    if ((!stats.lastReply && stats.replyStreak !== 0)
      || (stats.lastReply && isDayBeforeYesterday(stats.lastReply))) {
      stats.replyStreak = 0;
      hasChanged = true;
    }

    if ((!stats.lastComment && stats.commentStreak !== 0)
      || (stats.lastComment && isDayBeforeYesterday(stats.lastComment))) {
      stats.commentStreak = 0;
      hasChanged = true;
    }

    if ((!stats.lastAction && stats.actionStreak !== 0)
      || (stats.lastAction && isDayBeforeYesterday(stats.lastAction))) {
      stats.actionStreak = 0;
      hasChanged = true;
    }

    if (hasChanged)
      await this.statisticsRepository.flush();

    return {
      postStreak: stats.postStreak,
      replyStreak: stats.replyStreak,
      commentStreak: stats.commentStreak,
      actionStreak: stats.actionStreak,
    };
  }
}
