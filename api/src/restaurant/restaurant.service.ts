import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import { DailyInfo } from './daily-info/daily-info.entity';
import { DailyMenu } from './daily-menus/daily-menu.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(DailyMenu) private readonly dailyMenuRepository: BaseRepository<DailyMenu>,
    @InjectRepository(DailyInfo) private readonly dailyInfoRepository: BaseRepository<DailyInfo>,
  ) {}

  public async findOneDateMenu(date: Date): Promise<DailyMenu | null> {
    const today = { day: date.getDate(), mounth: date.getMonth(), year: date.getFullYear() };
    const todayMidnight = new Date(today.year, today.mounth, today.day, 0, 0, 0);
    const today23h59 = new Date(today.year, today.mounth, today.day, 23, 59, 59);
    return await this.dailyMenuRepository.findOne({ date: { $gte: todayMidnight, $lt: today23h59 } }, { populate: ['starters', 'dishes', 'desserts'] });
  }

  public async findAllDateInfo(date: Date): Promise<DailyInfo | null> {
    const today = { day: date.getDate(), mounth: date.getMonth(), year: date.getFullYear() };
    const todayMidnight = new Date(today.year, today.mounth, today.day, 0, 0, 0);
    const today23h59 = new Date(today.year, today.mounth, today.day, 23, 59, 59);
    return await this.dailyInfoRepository.findOne({ date: { $gte: todayMidnight, $lt: today23h59 } });
  }
}
