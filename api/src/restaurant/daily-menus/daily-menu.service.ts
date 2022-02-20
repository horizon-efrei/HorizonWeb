import { UniqueConstraintViolationException, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseRepository } from '../../shared/lib/repositories/base.repository';
import type { PaginateDto } from '../../shared/modules/pagination/paginate.dto';
import type { PaginatedResult } from '../../shared/modules/pagination/pagination.interface';
import { Food } from '../food/food.entity';
import { DailyMenu } from './daily-menu.entity';
import type { CreateDailyMenuDto } from './dto/create-daily-menu.dto';
import type { UpdateDailyMenuDto } from './dto/update-daily-menu.dto';

type NormalizedDate<T> = Omit<T, 'normalizeDates'> & { date: Date };

@Injectable()
export class DailyMenusService {
  constructor(
    @InjectRepository(DailyMenu) private readonly dailyMenuRepository: BaseRepository<DailyMenu>,
    @InjectRepository(Food) private readonly foodRepository: BaseRepository<Food>,
  ) {}

  public async create(createDailyMenuDto: NormalizedDate<CreateDailyMenuDto>): Promise<DailyMenu> {
    const menu = new DailyMenu(createDailyMenuDto);
    const starters = await this.foodRepository.find({ foodId: { $in: createDailyMenuDto.starters } });
    const dishes = await this.foodRepository.find({ foodId: { $in: createDailyMenuDto.dishes } });
    const desserts = await this.foodRepository.find({ foodId: { $in: createDailyMenuDto.desserts } });

    menu.starters.set(starters);
    menu.dishes.set(dishes);
    menu.desserts.set(desserts);

    try {
      await this.dailyMenuRepository.persistAndFlush(menu);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Daily menu for date already exists');
      throw error;
    }
    return menu;
  }

  public async findAll(paginationOptions?: Required<PaginateDto>): Promise<PaginatedResult<DailyMenu>> {
    return await this.dailyMenuRepository.findWithPagination(
      paginationOptions,
      {},
      {
        populate: ['starters', 'dishes', 'desserts'],
        orderBy: { date: 'DESC' },
      },
      );
  }

  public async findOne(menuId: number): Promise<DailyMenu> {
    return await this.dailyMenuRepository.findOneOrFail({ menuId }, { populate: ['starters', 'dishes', 'desserts'] });
  }

  public async update(menuId: number, updateDailyMenuDto: NormalizedDate<UpdateDailyMenuDto>): Promise<DailyMenu> {
    const menu = await this.dailyMenuRepository.findOneOrFail({ menuId });
    const starters = await this.foodRepository.find({ foodId: { $in: updateDailyMenuDto.starters } });
    const dishes = await this.foodRepository.find({ foodId: { $in: updateDailyMenuDto.dishes } });
    const desserts = await this.foodRepository.find({ foodId: { $in: updateDailyMenuDto.desserts } });
    wrap(menu).assign({
      date: updateDailyMenuDto.date,
      starters,
      dishes,
      desserts,
    });
    await this.dailyMenuRepository.flush();
    return menu;
  }

  public async remove(menuId: number): Promise<void> {
    const menu = await this.dailyMenuRepository.findOneOrFail({ menuId });
    await this.dailyMenuRepository.removeAndFlush(menu);
  }
}
