import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClubsService } from '../clubs/clubs.service';
import { Action, CheckPolicies } from '../shared/modules/authorization';
import { UsersService } from '../users/users.service';
import { CreateSocialAccountDto } from './dto/create-social-account.dto';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialAccountDto } from './dto/update-social-account.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import type { ClubSocialAccount } from './entities/club-social-account.entity';
import { Social } from './entities/social.entity';
import type { UserSocialAccount } from './entities/user-social-account.entity';
import { SocialsService } from './socials.service';

@ApiTags('Socials')
@Controller({ path: 'socials' })
export class SocialsController {
  constructor(
    private readonly socialsService: SocialsService,
    private readonly usersService: UsersService,
    private readonly clubsService: ClubsService,
    ) {}

  @Post()
  @CheckPolicies(ability => ability.can(Action.Create, Social))
  public async create(@Body() createSocialDto: CreateSocialDto): Promise<Social> {
    return await this.socialsService.create(createSocialDto);
  }

  @Get()
  @CheckPolicies(ability => ability.can(Action.Read, Social))
  public async findAll(): Promise<Social[]> {
    return await this.socialsService.findAll();
  }

  @Post('/user/:userId')
  public async addUserSocial(@Param('userId') userId: string, @Body() createSocialAccountDto: CreateSocialAccountDto): Promise<UserSocialAccount> {
    const user = await this.usersService.findOneById(userId);
    return await this.socialsService.addUserSocial(user, createSocialAccountDto);
  }

  @Get('/user/:userId')
  public async getUserSocials(@Param('userId')userId: string): Promise<UserSocialAccount[]> {
    const user = await this.usersService.findOneById(userId);
    return await this.socialsService.findAllAccounts(user);
  }

  @Patch('/user/:socialAccountId')
  public async updateUserAccount(@Param('socialAccountId', ParseIntPipe)socialAccountId: number, @Body()updateSocialAccountDto: UpdateSocialAccountDto): Promise<UserSocialAccount > {
    return await this.socialsService.updateUserAccount(socialAccountId, updateSocialAccountDto);
  }


  @Delete('/user/:socialAccountId')
  public async deleteUserAccount(@Param('socialAccountId', ParseIntPipe)socialAccountId: number): Promise<void> {
    await this.socialsService.deleteUserAccount(socialAccountId);
  }

  @Post('/club/:clubId')
  public async addClubSocial(@Param('clubId', ParseIntPipe) clubId: number, @Body() createSocialAccountDto: CreateSocialAccountDto): Promise<ClubSocialAccount> {
    const club = await this.clubsService.findOne(clubId);
    return await this.socialsService.addClubSocial(club, createSocialAccountDto);
  }


  @Get('/club/:clubId')
  public async findAllClubs(@Param('clubId', ParseIntPipe)clubId: number): Promise<ClubSocialAccount[]> {
    const club = await this.clubsService.findOne(clubId);
    return await this.socialsService.findAllClubs(club);
  }

  @Patch('/club/:socialAccountId')
  public async updateClubAccount(@Param('socialAccountId', ParseIntPipe)socialAccountId: number, @Body()updateSocialAccountDto: UpdateSocialAccountDto): Promise<ClubSocialAccount > {
    return await this.socialsService.updateClubAccount(socialAccountId, updateSocialAccountDto);
  }


  @Delete('/club/:socialAccountId')
  public async deleteClubAccount(@Param('socialAccountId', ParseIntPipe)socialAccountId: number): Promise<void> {
    await this.socialsService.deleteClubAccount(socialAccountId);
  }

  @Get(':name')
  @CheckPolicies(ability => ability.can(Action.Read, Social))
  public async findOne(@Param('name') name: string): Promise<Social | null> {
    return await this.socialsService.findOne(name);
  }

  @Patch(':name')
  @CheckPolicies(ability => ability.can(Action.Update, Social))
  public async update(@Param('name') name: string, @Body() updateSocialDto: UpdateSocialDto): Promise<Social> {
    return await this.socialsService.update(name, updateSocialDto);
  }

  @Delete(':name')
  @CheckPolicies(ability => ability.can(Action.Delete, Social))
  public async remove(@Param('name') name: string): Promise<void> {
    await this.socialsService.remove(name);
  }
}
