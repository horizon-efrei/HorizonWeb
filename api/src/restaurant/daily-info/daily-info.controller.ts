import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Action, CheckPolicies } from '../../shared/modules/authorization';
import { PaginateDto } from '../../shared/modules/pagination/paginate.dto';
import type { PaginatedResult } from '../../shared/modules/pagination/pagination.interface';
import { DailyInfo } from './daily-info.entity';
import { DailyInfoService } from './daily-info.service';
import { CreateDailyInfoDto } from './dto/create-daily-info.dto';
import { UpdateDailyInfoDto } from './dto/update-daily-info.dto';

@ApiTags('DailyInfo')
@Controller()
export class DailyInfoController {
  constructor(
    private readonly dailyInfoService: DailyInfoService,
  ) {}

  @Post()
  @CheckPolicies(ability => ability.can(Action.Create, DailyInfo))
  public async create(@Body() createDailyInfoDto: CreateDailyInfoDto): Promise<DailyInfo> {
    return await this.dailyInfoService.create(createDailyInfoDto.normalizeDates());
  }

  @Get()
  @CheckPolicies(ability => ability.can(Action.Read, DailyInfo))
  public async findAll(
    @Query() query: PaginateDto,
  ): Promise<PaginatedResult<DailyInfo>> {
    if (query.page)
      return await this.dailyInfoService.findAll({ page: query.page, itemsPerPage: query.itemsPerPage ?? 10 });
    return await this.dailyInfoService.findAll();
  }

  @Get(':id')
  @CheckPolicies(ability => ability.can(Action.Read, DailyInfo))
  public async findOne(@Param('id') id: number): Promise<DailyInfo> {
    return await this.dailyInfoService.findOne(id);
  }

  @Patch(':id')
  @CheckPolicies(ability => ability.can(Action.Update, DailyInfo))
  public async update(@Param('id') id: number, @Body() updateDailyInfoDto: UpdateDailyInfoDto): Promise<DailyInfo> {
    return await this.dailyInfoService.update(id, updateDailyInfoDto.normalizeDates());
  }

  @Delete(':id')
  @CheckPolicies(ability => ability.can(Action.Delete, DailyInfo))
  public async remove(@Param('id') id: number): Promise<void> {
    await this.dailyInfoService.remove(id);
  }
}
