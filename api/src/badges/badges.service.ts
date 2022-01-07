import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import { Badge } from './badge.entity';
import type { CreateBadgesDto } from './dto/create-badges.dto';

@Injectable()
export class BadgesService {
  constructor(@InjectRepository(Badge) private readonly badgeRepository: BaseRepository<Badge>) {}

  public async createMany(createBadgesDto: CreateBadgesDto): Promise<Badge[]> {
    const badges: Badge[] = [];

    for (const item of createBadgesDto.badges) {
      const sameSlugBadge = await this.badgeRepository.findOne({ slug: item.slug });
      if (sameSlugBadge)
        throw new BadRequestException(`Badge with same slug already exists : ${item.slug}`);

      const sameNameBadge = await this.badgeRepository.findOne({ name: item.name });
      if (sameNameBadge)
        throw new BadRequestException(`Badge with same name already exists : ${item.name}`);

      badges.push(new Badge(item));
    }

    try {
      await this.badgeRepository.persistAndFlush(badges); // As an array
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintViolationException)
throw new BadRequestException('Error'); // 'Tag name already exists'
      throw error;
    }

    return badges;
  }
}
