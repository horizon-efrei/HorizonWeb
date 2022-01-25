import {
 Body, Controller, Delete, Get, Param, Patch, Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrousService } from './crous.service';
import { CreateDailyMenuDto } from './dto/create-dailyMenu.dto';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateDailyMenuDto } from './dto/update-dailyMenu.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import type { DailyMenu } from './entities/dailyMenu.entity';
import type { Food } from './entities/food.entity';

@ApiTags('Crous')
@Controller({ path: 'crous' })
export class CrousController {
  constructor(private readonly crousService: CrousService) {}

  @Get()
  public async getAllMenus(): Promise<void> {
    // ...
    await this.crousService.getAllMenus();
  }

  @Post('/food')
  public async createFood(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
    return await this.crousService.createFood(createFoodDto);
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
}
