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
// Import { Action, CheckPolicies } from '../shared/modules/authorization';
import { PaginateDto } from '../shared/modules/pagination/paginate.dto';
import type { PaginatedResult } from '../shared/modules/pagination/pagination.interface';
import { CreateWikiDto } from './dto/create-wiki.dto';
import { UpdateWikiDto } from './dto/update-wiki.dto';
import type { Wiki } from './wiki.entity';
import { WikisService } from './wikis.service';

@ApiTags('Wikis')
@Controller({ path: 'wikis' })
export class WikisController {
  constructor(private readonly wikisService: WikisService) {}

  @Post()
  // @CheckPolicies(ability => ability.can(Action.Create, Wiki))
  public async create(@Body() createWikiDto: CreateWikiDto): Promise<Wiki> {
    return await this.wikisService.create(createWikiDto);
  }

  @Get()
  // @CheckPolicies(ability => ability.can(Action.Read, Wiki))
  public async findAll(@Query() query: PaginateDto): Promise<PaginatedResult<Wiki>> {
    if (query.page)
      return await this.wikisService.findAll({ page: query.page, itemsPerPage: query.itemsPerPage ?? 10 });
    return await this.wikisService.findAll();
  }

  @Get(':category')
  // @CheckPolicies(ability => ability.can(Action.Read, Wiki))
  public async findByCategory(@Query() query: PaginateDto, @Param('category') category: string): Promise<PaginatedResult<Wiki>> {
    return await this.wikisService.findByCategory(category);
  }

  @Get(':wikiPageId')
  // @CheckPolicies(ability => ability.can(Action.Read, Wiki))
  public async findOne(@Param('wikiPageId') wikiPageId: number): Promise<Wiki | null> {
    return await this.wikisService.findOne(wikiPageId);
  }

  @Patch(':wikiPageId')
  // @CheckPolicies(ability => ability.can(Action.Update, Wiki))
  public async update(@Param('wikiPageId') wikiPageId: number, @Body() updateWikiDto: UpdateWikiDto): Promise<Wiki> {
    return await this.wikisService.update(wikiPageId, updateWikiDto);
  }

  @Delete(':wikiPageId')
  // @CheckPolicies(ability => ability.can(Action.Delete, Wiki))
  public async remove(@Param('wikiPageId') wikiPageId: number): Promise<void> {
    await this.wikisService.remove(wikiPageId);
  }
}
