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
import { Action, CheckPolicies } from '../shared/modules/authorization';
import { PaginateDto } from '../shared/modules/pagination/paginate.dto';
import type { PaginatedResult } from '../shared/modules/pagination/pagination.interface';
import { Badge } from './badge.entity';
import { BadgesService } from './badges.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';

@ApiTags('Badges')
@Controller({ path: 'badges' })
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Post()
  @CheckPolicies(ability => ability.can(Action.Create, Badge))
  public async create(@Body() createTagDto: CreateBadgeDto): Promise<Badge> {
    return await this.badgesService.create(createTagDto);
  }

  @Get()
  @CheckPolicies(ability => ability.can(Action.Read, Badge))
  public async findAll(@Query() query: PaginateDto): Promise<PaginatedResult<Badge>> {
    if (query.page)
      return await this.badgesService.findAll({ page: query.page, itemsPerPage: query.itemsPerPage ?? 10 });
    return await this.badgesService.findAll();
  }

  @Get(':name')
  @CheckPolicies(ability => ability.can(Action.Read, Badge))
  public async findOne(@Param('name') name: string): Promise<Badge> {
    return await this.badgesService.findOne(name);
  }

  @Patch(':name')
  @CheckPolicies(ability => ability.can(Action.Update, Badge))
  public async update(@Param('name') name: string, @Body() updateBadgeDto: UpdateBadgeDto): Promise<Badge> {
    return await this.badgesService.update(name, updateBadgeDto);
  }

  @Delete(':name')
  @CheckPolicies(ability => ability.can(Action.Delete, Badge))
  public async remove(@Param('name') name: string): Promise<void> {
    await this.badgesService.remove(name);
  }
}
