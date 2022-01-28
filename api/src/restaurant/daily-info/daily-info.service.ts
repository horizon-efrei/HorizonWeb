import { UniqueConstraintViolationException, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseRepository } from '../../shared/lib/repositories/base.repository';
import type { PaginationOptions } from '../../shared/modules/pagination/pagination-option.interface';
import type { PaginatedResult } from '../../shared/modules/pagination/pagination.interface';
import { DailyInfo } from './daily-info.entity';
import type { CreateDailyInfoDto } from './dto/create-daily-info.dto';
import type { UpdateDailyInfoDto } from './dto/update-daily-info.dto';

type NormalizedDate<T> = Omit<T, 'normalizeDates'> & { date: Date };

@Injectable()
export class DailyInfoService {
  constructor(
    @InjectRepository(DailyInfo) private readonly dailyInfoRepository: BaseRepository<DailyInfo>,
  ) {}

  public async create(createDailyInfoDto: NormalizedDate<CreateDailyInfoDto>): Promise<DailyInfo> {
    const info = new DailyInfo(createDailyInfoDto);
    try {
      await this.dailyInfoRepository.persistAndFlush(info);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Daily info for date already exists');
      throw error;
    }
    return info;
  }

  public async findOne(infoId: number): Promise<DailyInfo> {
    return await this.dailyInfoRepository.findOneOrFail({ infoId });
  }

  public async findAll(paginationOptions?: PaginationOptions): Promise<PaginatedResult<DailyInfo>> {
    return await this.dailyInfoRepository.findWithPagination(paginationOptions);
  }

  public async update(infoId: number, updateDailyInfoDto: NormalizedDate<UpdateDailyInfoDto>): Promise<DailyInfo> {
    const info = await this.dailyInfoRepository.findOneOrFail({ infoId });
    wrap(info).assign(updateDailyInfoDto);
    await this.dailyInfoRepository.flush();
    return info;
  }

  public async remove(infoId: number): Promise<void> {
    const dailyInfo = await this.dailyInfoRepository.findOneOrFail({ infoId });
    await this.dailyInfoRepository.removeAndFlush(dailyInfo);
  }
}
