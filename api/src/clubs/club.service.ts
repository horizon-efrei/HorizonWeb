import { UniqueConstraintViolationException, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import type { PaginationOptions } from '../shared/modules/pagination/pagination-option.interface';
import type { PaginatedResult } from '../shared/modules/pagination/pagination.interface';
import type { User } from '../users/user.entity';
import { ClubMember } from './club-member.entity';
import { Club } from './club.entity';
import type { CreateClubMemberDto } from './dto/create-club-member.dto';
import type { CreateClubDto } from './dto/create-club.dto';
import type { UpdateClubMemberDto } from './dto/update-club-member.dto';
import type { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club) private readonly clubRepository: BaseRepository<Club>,
    @InjectRepository(ClubMember) private readonly clubMemberRepository:
     BaseRepository<ClubMember>,
    ) {}

  public async create(createClubDto: CreateClubDto): Promise<Club> {
    const club = new Club(createClubDto);

    try {
      await this.clubRepository.persistAndFlush(club);
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Badge already exists');
      throw error;
    }

    return club;
  }

  public async findAll(paginationOptions?: PaginationOptions): Promise<PaginatedResult<Club>> {
    return await this.clubRepository.findWithPagination(paginationOptions);
  }

  public async findOne(clubId: number): Promise<Club> {
    return await this.clubRepository.findOneOrFail({ clubId });
  }

  public async update(clubId: number, updateClubDto: UpdateClubDto): Promise<Club> {
    const club = await this.clubRepository.findOneOrFail({ clubId });

    wrap(club).assign(updateClubDto);
    await this.clubRepository.flush();
    return club;
  }

  public async remove(clubId: number): Promise<void> {
    const club = await this.clubRepository.findOneOrFail({ clubId });
    await this.clubRepository.removeAndFlush(club);
  }

  public async joinClub(
    clubId: number,
    user: User,
    createClubMemberDto: CreateClubMemberDto,
): Promise<ClubMember> {
    const club = await this.findOne(clubId);
    console.log("Jambon");
    const clubMember = new ClubMember({ club, user, ...createClubMemberDto });
    await this.clubMemberRepository.persistAndFlush(clubMember);
    return clubMember;
  }

  public async findJoined(user: User): Promise<ClubMember[]> {
    return await this.clubMemberRepository.findAll(user);
  }

  public async updateRole(clubId: number, user: User, updateClubMemberDto: UpdateClubMemberDto): Promise <ClubMember> {
    const club = await this.clubRepository.findOneOrFail({ clubId });
    const clubJoined = await this.clubMemberRepository.findOneOrFail({ club, user });

    wrap(clubJoined).assign(updateClubMemberDto);
    await this.clubMemberRepository.flush();
    return clubJoined;
  }

  public async leaveClub(clubId: number, user: User): Promise<void> {
    const clubMember = await this.clubMemberRepository.findOneOrFail({ club: { clubId }, user });
    await this.clubMemberRepository.removeAndFlush(clubMember);
  }
}
