import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import type { User } from '../users/user.entity';
import { Stat } from './userStat.entity';

@Injectable()
export class UserStatsService {
  constructor(
    @InjectRepository(Stat) private readonly userStatRepository: BaseRepository<Stat>,
  ) {}

  public async create(user: User): Promise<Stat> {
    const stat = new Stat({ user });
    try {
      await this.userStatRepository.persistAndFlush(stat);
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Tag name already exists');
      throw error;
    }
    return stat;
  }

  public async findOne(statId: number): Promise<Stat> {
    return await this.userStatRepository.findOneOrFail({ statId });
  }


  public async remove(statId: number): Promise<void> {
    const tag = await this.userStatRepository.findOneOrFail({ statId });
    await this.userStatRepository.removeAndFlush(tag);
  }
}
