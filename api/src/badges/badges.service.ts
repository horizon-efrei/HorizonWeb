import { UniqueConstraintViolationException, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import type { PaginationOptions } from '../shared/modules/pagination/pagination-option.interface';
import type { PaginatedResult } from '../shared/modules/pagination/pagination.interface';
import type { User } from '../users/user.entity';
import { BadgeUnlock } from './badge-unlock.entity';
import { Badge } from './badge.entity';
import type { CreateBadgeDto } from './dto/create-badge.dto';
import type { UpdateBadgeDto } from './dto/update-badge.dto';

@Injectable()
export class BadgesService {
  constructor(
    @InjectRepository(Badge) private readonly badgeRepository: BaseRepository<Badge>,
    @InjectRepository(BadgeUnlock) private readonly badgeUnlockRepository: BaseRepository<BadgeUnlock>,
    ) {}

  public async create(createBadgeDto: CreateBadgeDto): Promise<Badge> {
    const badge = new Badge(createBadgeDto);

    try {
      await this.badgeRepository.persistAndFlush(badge);
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Badge already exists');
      throw error;
    }

    return badge;
  }

  public async findAll(paginationOptions?: PaginationOptions): Promise<PaginatedResult<Badge>> {
    return await this.badgeRepository.findWithPagination(paginationOptions);
  }

  public async findOne(name: string): Promise<Badge> {
    return await this.badgeRepository.findOneOrFail({ name });
  }

  public async update(name: string, updateBadgeDto: UpdateBadgeDto): Promise<Badge> {
    const badge = await this.badgeRepository.findOneOrFail({ name });

    wrap(badge).assign(updateBadgeDto);
    await this.badgeRepository.flush();
    return badge;
  }

  public async remove(name: string): Promise<void> {
    const badge = await this.badgeRepository.findOneOrFail({ name });
    await this.badgeRepository.removeAndFlush(badge);
  }

  public async unlockForUser(badgeName: string, user: User): Promise<BadgeUnlock> {
    const badge = await this.findOne(badgeName);
    const badgeUnlock = new BadgeUnlock({ badge, user });
    await this.badgeUnlockRepository.persistAndFlush(badgeUnlock);
    return badgeUnlock;
  }
}
