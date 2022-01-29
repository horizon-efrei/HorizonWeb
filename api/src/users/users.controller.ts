import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { TypesenseGuard } from '../shared/lib/guards/typesense.guard';
import { PaginateDto } from '../shared/modules/pagination/paginate.dto';
import type { PaginatedResult } from '../shared/modules/pagination/pagination.interface';
import { SearchDto } from '../shared/modules/search/search.dto';
import { UserSearchService } from './user-search.service';
import type { IndexedUser } from './user-search.service';
import type { User } from './user.entity';
import { UsersService } from './users.service';
import { RegisterDto } from 'src/auth/dto/register.dto';

@ApiTags('Users')
@Controller({ path: 'users' })
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userSearchService: UserSearchService,
  ) {}

  @Get()
  public async findAll(@Query() query: PaginateDto): Promise<PaginatedResult<User>> {
    if (query.page)
      return await this.usersService.findAll({ page: query.page, itemsPerPage: query.itemsPerPage ?? 5 });
    return await this.usersService.findAll();
  }

  @Get(':username')
  public async findOne(@Param('username') username: string): Promise<User> {
    return await this.usersService.findOne(username);
  }

  @UseGuards(TypesenseGuard)
  @Get('/search')
  public async search(
    @Query('full') full: boolean,
    @Query() query: SearchDto,
  ): Promise<SearchResponse<IndexedUser> | SearchResponse<User>> {
    if (full)
      return await this.userSearchService.searchAndPopulate(query);
    return await this.userSearchService.search(query);
  }

  /* May be an error here */
  @Post()
  public async create(@Body() createdUser: RegisterDto): Promise<User> {
    return await this.usersService.create(createdUser);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id)
  }

}
