import {
 Body, Controller, Delete, Get, Param, Patch, Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrousService } from './crous.service';
import { CreateDailyInfosDto } from './dto/create-dailyInfos.dto';
import { CreateDailyMenuDto } from './dto/create-dailyMenu.dto';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateDailyInfosDto } from './dto/update-dailyInfos.dto';
import { UpdateDailyMenuDto } from './dto/update-dailyMenu.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import type { DailyInfos } from './entities/dailyInfos.entity';
import type { DailyMenu } from './entities/dailyMenu.entity';
import type { Food } from './entities/food.entity';

@ApiTags('Crous')
@Controller({ path: 'crous' })
export class CrousController {
  constructor(private readonly crousService: CrousService) {}

  @Get('/menu')
  public async getAllMenus(): Promise<DailyMenu[]> {
    return await this.crousService.getAllMenus();
  }

  @Post('/food')
  public async createFood(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
    return await this.crousService.createFood(createFoodDto);
  }

  @Get('/food')
  public async getFoods(): Promise<Food[]> {
    return await this.crousService.getFoods();
  }

  @Get('/food/:foodId')
  public async getOneFood(@Param('foodId')foodId: number): Promise<Food> {
    return await this.crousService.getOneFood(foodId);
  }

  @Patch('/food/:foodId')
  public async updateFood(@Param('foodId')foodId: number, @Body()updateFoodDto: UpdateFoodDto): Promise<Food> {
    return await this.crousService.updateFood(foodId, updateFoodDto);
  }

  @Delete('/food/:foodId')
  public async removeFood(@Param('foodId')foodId: number): Promise<void> {
    await this.crousService.deleteFood(foodId);
  }

  @Post('/menu')
  public async createMenu(@Body()createDailyMenuDto: CreateDailyMenuDto): Promise<DailyMenu> {
    return await this.crousService.createDailyMenu(createDailyMenuDto);
  }

  @Get('/menu/:menuId')
  public async getOneMenu(@Param('menuId')menuId: number): Promise<DailyMenu> {
    return await this.crousService.getOneMenu(menuId);
  }

  @Delete('/menu/:menuId')
  public async removeMenu(@Param('menuId')menuId: number): Promise<void> {
    await this.crousService.removeMenu(menuId);
  }

  @Patch('/menu/:menuId')
  public async updateMenu(@Param('menuId')menuId: number, @Body()updateDailyMenuDto: UpdateDailyMenuDto): Promise<DailyMenu> {
    return await this.crousService.updateMenu(menuId, updateDailyMenuDto);
  }

  @Post('/infos')
  public async createInfos(@Body()createDailyInfosDto: CreateDailyInfosDto): Promise<DailyInfos> {
    return await this.crousService.createDailyInfo(createDailyInfosDto);
  }

  @Get('/infos')
  public async findAllInfos(): Promise<DailyInfos[]> {
    return await this.crousService.findDailyInfos();
  }

  @Get('/infos/:infoId')
  public async findOneInfo(@Param('infoId')infoId: number): Promise<DailyInfos> {
    return await this.crousService.findDailyInfo(infoId);
  }

  @Patch('/infos/:infoId')
  public async updateInfo(@Param('infoId')infoId: number, @Body()updateDailyInfosDto: UpdateDailyInfosDto): Promise<DailyInfos> {
    return await this.crousService.updateDailyInfo(infoId, updateDailyInfosDto);
  }

  @Delete('/infos/:infoId')
  public async removeInfo(@Param('infoId')infoId: number): Promise<void> {
    await this.crousService.removeDailyInfo(infoId);
  }

  @Get('/today')
  public async getToday(): Promise<{ menu: DailyMenu | null; infos: DailyInfos | null }> {
    const today = new Date();
    return {
      menu: await this.crousService.getDateMenu(today),
      infos: await this.crousService.getDateInfos(today),
    };
  }

  @Get('/daily/:date')
  public async getDate(@Param('date')date: string): Promise<{ menu: DailyMenu | null; infos: DailyInfos | null }> {
    const wantedDate = new Date(date);
    return {
      menu: await this.crousService.getDateMenu(wantedDate),
      infos: await this.crousService.getDateInfos(wantedDate),
    };
  }
}
