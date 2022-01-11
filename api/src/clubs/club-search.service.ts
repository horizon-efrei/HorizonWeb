import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import type { SearchParams, SearchResponse } from 'typesense/lib/Typesense/Documents';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import { authorizeNotFound, SearchService } from '../shared/modules/search/search.service';
import { client } from '../typesense.config';
import { Club } from './club.entity';

export interface IndexedClub {
  slug: string;
  name: string;
  description?: string;
  id: string;
}

@Injectable()
export class ClubSearchService extends SearchService<Club, IndexedClub> {
  private static readonly schema: CollectionCreateSchema = {
    name: 'subjects',
    fields: [
      { name: 'code', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'englishName', type: 'string' },
      { name: 'description', type: 'string', optional: true },
    ],
  };

  private readonly documents = client.collections<IndexedClub>('clubs').documents();

  constructor(
    @InjectRepository(Club) private readonly clubRepository: BaseRepository<Club>,
  ) { super(ClubSearchService.schema, 'subjects'); }

  public async init(): Promise<void> {
    const clubs = await this.clubRepository.findAll();
    await super.init(clubs, entity => this.toIndexedEntity(entity));
  }

  public async add(club: Club): Promise<void> {
    await this.documents.create(this.toIndexedEntity(club));
  }

  public async update(club: Club): Promise<void> {
    await this.documents.update(this.toIndexedEntity(club)).catch(authorizeNotFound);
  }

  public async remove(clubId: string): Promise<void> {
    await this.documents.delete(clubId).catch(authorizeNotFound);
  }

  public async search(queries: SearchParams<IndexedClub>): Promise<SearchResponse<IndexedClub>> {
    return await this.documents.search(queries);
  }

  public async searchAndPopulate(queries: SearchParams<IndexedClub>): Promise<SearchResponse<Club>> {
    const results = await this.documents.search(queries);

    if (results.hits?.length) {
      const clubIds = results.hits.map(hit => hit.document.id).map(Number);
      const clubs = await this.clubRepository.find({ clubId: { $in: clubIds } });
      for (const hit of results.hits)
        // @ts-expect-error: This works, TypeScript... I know there is a mismatch between IndexedSubject.id and
        // Subject.subjectId. I know.
        hit.document = clubs.find(club => club.clubId === hit.document.id)!;
    }
    // @ts-expect-error: Ditto.
    return results;
  }

  public toIndexedEntity(club: Club): IndexedClub {
    return {
      slug: club.slug,
      name: club.clubName,
      description: club.clubDescription,
      id: club.clubId.toString(),
    };
  }
}
