import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import type { CreateDailyInfosDto } from './dto/create-dailyInfos.dto';
import type { CreateDailyMenuDto } from './dto/create-dailyMenu.dto';
import type { CreateFoodDto } from './dto/create-food.dto';
import type { UpdateDailyInfosDto } from './dto/update-dailyInfos.dto';
import type { UpdateDailyMenuDto } from './dto/update-dailyMenu.dto';
import type { UpdateFoodDto } from './dto/update-food.dto';
import { DailyInfos } from './entities/dailyInfos.entity';
import { DailyMenu } from './entities/dailyMenu.entity';
import { Food } from './entities/food.entity';

@Injectable()
export class CrousService {
  constructor(
    @InjectRepository(Food) private readonly foodRepository: BaseRepository<Food>,
    @InjectRepository(DailyMenu) private readonly dailyMenuRepository: BaseRepository<DailyMenu>,
    @InjectRepository(DailyInfos) private readonly dailyInfosRepository: BaseRepository<DailyInfos>,
  ) {}

  public async getAllMenus(): Promise<DailyMenu[]> {
    return await this.dailyMenuRepository.findAll({ populate: ['entree', 'dish', 'desserts'] });
  }

  public async createFood(createFoodDto: CreateFoodDto): Promise<Food> {
    const food = new Food(createFoodDto);
    await this.foodRepository.persistAndFlush(food);
    return food;
  }

  public async getFoods(): Promise<Food[]> {
    return await this.foodRepository.findAll();
  }

  public async getOneFood(foodId: number): Promise<Food> {
    return await this.foodRepository.findOneOrFail({ foodId });
  }

  public async updateFood(foodId: number, updateFoodDto: UpdateFoodDto): Promise<Food> {
    const food = await this.foodRepository.findOneOrFail({ foodId });
    wrap(food).assign(updateFoodDto);
    await this.foodRepository.flush();
    return food;
  }

  public async deleteFood(foodId: number): Promise<void> {
    const food = await this.foodRepository.findOneOrFail({ foodId });
    await this.foodRepository.removeAndFlush(food);
  }

  public async createDailyMenu(createDailyMenuDto: CreateDailyMenuDto): Promise<DailyMenu> {
    const menu = new DailyMenu({ date: createDailyMenuDto.date });
    const entree = await this.foodRepository.find({ foodId: { $in: createDailyMenuDto.entree } });
    const dish = await this.foodRepository.find({ foodId: { $in: createDailyMenuDto.dish } });
    const desserts = await this.foodRepository.find({ foodId: { $in: createDailyMenuDto.desserts } });

    menu.entree.set(entree);
    menu.dish.set(dish);
    menu.desserts.set(desserts);

    await this.dailyMenuRepository.persistAndFlush(menu);
    return menu;
  }

  public async getOneMenu(menuId: number): Promise<DailyMenu> {
    return await this.dailyMenuRepository.findOneOrFail({ menuId }, { populate: ['entree', 'dish', 'desserts'] });
  }

  public async removeMenu(menuId: number): Promise<void> {
    await this.dailyMenuRepository.nativeDelete({ menuId });
  }

  public async updateMenu(menuId: number, updateDailyMenuDto: UpdateDailyMenuDto): Promise<DailyMenu> {
    const menu = await this.dailyMenuRepository.findOneOrFail({ menuId });
    const entree = await this.foodRepository.find({ foodId: { $in: updateDailyMenuDto.entree } });
    const dish = await this.foodRepository.find({ foodId: { $in: updateDailyMenuDto.dish } });
    const desserts = await this.foodRepository.find({ foodId: { $in: updateDailyMenuDto.desserts } });
    wrap(menu).assign({
      date: updateDailyMenuDto.date, entree, dish, desserts,
    });
    await this.dailyMenuRepository.flush();
    return menu;
  }

  public async createDailyInfo(createDailyInfosDto: CreateDailyInfosDto): Promise<DailyInfos> {
    const infos = new DailyInfos(createDailyInfosDto);
    await this.dailyInfosRepository.persistAndFlush(infos);
    return infos;
  }

  public async findDailyInfo(infoId: number): Promise<DailyInfos> {
    return await this.dailyInfosRepository.findOneOrFail({ infoId });
  }

  public async findDailyInfos(): Promise<DailyInfos[]> {
    return await this.dailyInfosRepository.findAll();
  }

  public async updateDailyInfo(infoId: number, updateDailyInfosDto: UpdateDailyInfosDto): Promise<DailyInfos> {
    const info = await this.dailyInfosRepository.findOneOrFail({ infoId });
    wrap(info).assign(updateDailyInfosDto);
    await this.dailyInfosRepository.flush();
    return info;
  }

  public async removeDailyInfo(infoId: number): Promise<void> {
    await this.dailyInfosRepository.nativeDelete({ infoId });
  }

  public async getDateMenu(date: Date): Promise<DailyMenu | null> {
    const today = { day: date.getDate(), mounth: date.getMonth(), year: date.getFullYear() };
    const todayMidnight = new Date(today.year, today.mounth, today.day, 0, 0, 0);
    const today23h59 = new Date(today.year, today.mounth, today.day, 23, 59, 59);
    return await this.dailyMenuRepository.findOne({ date: { $gte: todayMidnight, $lt: today23h59 } }, { populate: ['entree', 'dish', 'desserts'] });
  }

  public async getDateInfos(date: Date): Promise<DailyInfos | null> {
    const today = { day: date.getDate(), mounth: date.getMonth(), year: date.getFullYear() };
    const todayMidnight = new Date(today.year, today.mounth, today.day, 0, 0, 0);
    const today23h59 = new Date(today.year, today.mounth, today.day, 23, 59, 59);
    return await this.dailyInfosRepository.findOne({ date: { $gte: todayMidnight, $lt: today23h59 } });
  }
}
