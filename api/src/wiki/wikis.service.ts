import { UniqueConstraintViolationException, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import type { PaginationOptions } from '../shared/modules/pagination/pagination-option.interface';
import type { PaginatedResult } from '../shared/modules/pagination/pagination.interface';
import type { CreateWikiDto } from './dto/create-wiki.dto';
import type { UpdateWikiDto } from './dto/update-wiki.dto';
import { Wiki } from './wiki.entity';

@Injectable()
export class WikisService {
  constructor(
    @InjectRepository(Wiki) private readonly wikiRepository: BaseRepository<Wiki>,
  ) {}

  public async create(createWikiDto: CreateWikiDto): Promise<Wiki> {
    const wiki = new Wiki(createWikiDto);
    try {
      await this.wikiRepository.persistAndFlush(Wiki);
    } catch (error: unknown) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Wiki wikiPageId already exists');
      throw error;
    }
    return wiki;
  }

  public async findAll(paginationOptions?: PaginationOptions): Promise<PaginatedResult<Wiki>> {
    return await this.wikiRepository.findWithPagination(paginationOptions);
  }

  public async findByCategory(category: string, paginationOptions?: PaginationOptions): Promise<PaginatedResult<Wiki>> {
    return await this.wikiRepository.findWithPagination(paginationOptions, { category });
  }


  public async findOne(wikiPageId: number): Promise<Wiki> {
    return await this.wikiRepository.findOneOrFail({ wikiPageId });
  }

  public async update(wikiPageId: number, updateWikiDto: UpdateWikiDto): Promise<Wiki> {
    const wiki = await this.wikiRepository.findOneOrFail({ wikiPageId });

    wrap(wiki).assign(updateWikiDto);
    await this.wikiRepository.flush();
    return wiki;
  }

  public async remove(wikiPageId: number): Promise<void> {
    const wiki = await this.wikiRepository.findOneOrFail({ wikiPageId });
    await this.wikiRepository.removeAndFlush(wiki);
  }
}
