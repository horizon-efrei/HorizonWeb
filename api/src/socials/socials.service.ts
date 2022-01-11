import { UniqueConstraintViolationException, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { Club } from '../clubs/club.entity';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import type { User } from '../users/user.entity';
import type { CreateSocialAccountDto } from './dto/create-social-account.dto';
import type { CreateSocialDto } from './dto/create-social.dto';
import type { UpdateSocialDto } from './dto/update-social.dto';
import { ClubSocialAccount } from './entities/club-social-account.entity';
import { Social } from './entities/social.entity';
import { UserSocialAccount } from './entities/user-social-account.entity';

@Injectable()
export class SocialsService {
  constructor(
    @InjectRepository(Social) private readonly socialsRepository: BaseRepository<Social>,
    @InjectRepository(UserSocialAccount)
    private readonly userSocialsAccountRepository: BaseRepository<UserSocialAccount>,
    @InjectRepository(ClubSocialAccount)
    private readonly clubSocialsAccountRepository: BaseRepository<ClubSocialAccount>,
  ) {}

  public async create(createSocialDto: CreateSocialDto): Promise<Social> {
    const social = new Social(createSocialDto);
    try {
      await this.socialsRepository.persistAndFlush(social);
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Social name already exists');
      throw error;
    }
    return social;
  }

  public async findAll(): Promise<Social[]> {
    return await this.socialsRepository.findAll();
  }

  public async findOne(name: string): Promise<Social> {
    return await this.socialsRepository.findOneOrFail({ name });
  }

  public async update(name: string, updateSocialDto: UpdateSocialDto): Promise<Social> {
    const social = await this.socialsRepository.findOneOrFail({ name });

    wrap(social).assign(updateSocialDto);
    await this.socialsRepository.flush();
    return social;
  }

  public async remove(name: string): Promise<void> {
    const social = await this.socialsRepository.findOneOrFail({ name });
    await this.socialsRepository.removeAndFlush(social);
  }

  public async addUserSocial(user: User, createSocialAccountDto: CreateSocialAccountDto): Promise<UserSocialAccount> {
    const social = await this.socialsRepository.findOneOrFail({ name: createSocialAccountDto.name });
    const socialAccount = new UserSocialAccount({ user, ...createSocialAccountDto, social });
    try {
      await this.userSocialsAccountRepository.persistAndFlush(socialAccount);
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Social name already exists');
      throw error;
    }
    return socialAccount;
  }

  public async findAllAccounts(user: User): Promise<UserSocialAccount[]> {
    return await this.userSocialsAccountRepository.findAll(user);
  }

  public async addClubSocial(club: Club, createSocialAccountDto: CreateSocialAccountDto): Promise<ClubSocialAccount> {
    const social = await this.socialsRepository.findOneOrFail({ name: createSocialAccountDto.name });
    const socialAccount = new ClubSocialAccount({ club, ...createSocialAccountDto, social });
    try {
      await this.clubSocialsAccountRepository.persistAndFlush(socialAccount);
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Social name already exists');
      throw error;
    }
    return socialAccount;
  }

  public async findAllClubs(club: Club): Promise<ClubSocialAccount[]> {
    return await this.clubSocialsAccountRepository.findAll(club);
  }

  public async updateUserAccount(
    socialAccountId: number,
    updateSocialDto: UpdateSocialDto,
  ): Promise <UserSocialAccount > {
    const social = await this.userSocialsAccountRepository.findOneOrFail({ socialAccountId });

    wrap(social).assign(updateSocialDto);
    await this.userSocialsAccountRepository.flush();
    return social;
  }

  public async deleteUserAccount(socialAccountId: number): Promise<void> {
    const social = await this.userSocialsAccountRepository.findOneOrFail({ socialAccountId });
    await this.userSocialsAccountRepository.removeAndFlush(social);
  }

  public async updateClubAccount(
    socialAccountId: number,
    updateSocialDto: UpdateSocialDto,
  ): Promise <ClubSocialAccount > {
    const social = await this.clubSocialsAccountRepository.findOneOrFail({ socialAccountId });

    wrap(social).assign(updateSocialDto);
    await this.clubSocialsAccountRepository.flush();
    return social;
  }

  public async deleteClubAccount(socialAccountId: number): Promise<void> {
    const social = await this.clubSocialsAccountRepository.findOneOrFail({ socialAccountId });
    await this.clubSocialsAccountRepository.removeAndFlush(social);
  }
}
