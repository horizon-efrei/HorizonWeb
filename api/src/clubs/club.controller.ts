import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../shared/lib/decorators/current-user.decorator';
import { Action, CheckPolicies, PoliciesGuard } from '../shared/modules/authorization';
import { PaginateDto } from '../shared/modules/pagination/paginate.dto';
import type { PaginatedResult } from '../shared/modules/pagination/pagination.interface';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import type { ClubMember } from './club-member.entity';
import { Club } from './club.entity';
import { ClubsService } from './club.service';
import { CreateClubMemberDto } from './dto/create-club-member.dto';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubMemberDto } from './dto/update-club-member.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@ApiTags('Clubs')
@UseGuards(PoliciesGuard)
@Controller({ path: 'clubs' })
export class ClubsController {
  constructor(private readonly clubsService: ClubsService, private readonly userService: UsersService) {}

  @Post()
  @CheckPolicies(ability => ability.can(Action.Create, Club))
  public async create(@Body() createTagDto: CreateClubDto): Promise<Club> {
    return await this.clubsService.create(createTagDto);
  }

  @Get()
  @CheckPolicies(ability => ability.can(Action.Read, Club))
  public async findAll(@Query() query: PaginateDto): Promise<PaginatedResult<Club>> {
    if (query.page)
      return await this.clubsService.findAll({ page: query.page, itemsPerPage: query.itemsPerPage ?? 10 });
    return await this.clubsService.findAll();
  }

  @Get('/member/:memberId')
  public async findUnlocked(@Param('memberId')memberId: string): Promise<ClubMember[]> {
    const user = await this.userService.findOneById(memberId);
    return this.clubsService.findJoined(user);
  }

  @Patch('/member/:memberId/:clubId')
  public async updateRole(
    @Param('clubId', ParseIntPipe)clubId: number,
    @Param('memberId')memberId: string,
    @Body()updateClubMemberDto: UpdateClubMemberDto,
  ): Promise<ClubMember> {
    const user = await this.userService.findOneById(memberId);
    return await this.clubsService.updateRole(clubId, user, updateClubMemberDto);
  }

  @Delete('/member/:memberId/:clubId')
  public async leaveClub(
    @Param('clubId', ParseIntPipe)clubId: number,
    @Param('memberId')memberId: string,
  ): Promise<void> {
    const user = await this.userService.findOneById(memberId);
    await this.clubsService.leaveClub(clubId, user);
  }

  @Get(':clubId')
  @CheckPolicies(ability => ability.can(Action.Read, Club))
  public async findOne(@Param('clubId', ParseIntPipe) clubId: number): Promise<Club> {
    return await this.clubsService.findOne(clubId);
  }

  @Patch(':clubId')
  @CheckPolicies(ability => ability.can(Action.Update, Club))
  public async update(@Param('clubId', ParseIntPipe) clubId: number, @Body() updateSubjectDto: UpdateClubDto): Promise<Club> {
    return await this.clubsService.update(clubId, updateSubjectDto);
  }

  @Delete(':clubId')
  @CheckPolicies(ability => ability.can(Action.Delete, Club))
  public async remove(@Param('clubId', ParseIntPipe) clubId: number): Promise<void> {
    await this.clubsService.remove(clubId);
  }

  @Post(':clubId')
  @CheckPolicies(ability => ability.can(Action.Create, Club))
  public async unlockForUser(@Param('clubId', ParseIntPipe) clubId: number, @CurrentUser() user: User, @Body() createClubMemberDto: CreateClubMemberDto): Promise<ClubMember> {
    return await this.clubsService.joinClub(clubId, user, createClubMemberDto);
  }
}
