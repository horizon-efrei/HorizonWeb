import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { SearchParams } from 'typesense/lib/Typesense/Documents';
import type { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { client } from '../../shared/configs/typesense.config';
import RequireTypesense from '../../shared/lib/decorators/require-typesense.decorator';
import { BaseRepository } from '../../shared/lib/repositories/base.repository';
import { authorizeNotFound, SearchService } from '../../shared/modules/search/search.service';
import { Document } from './entities/document.entity';

export interface IndexedDocument {
  user: string;
  name: string;
  subjectName?: string;
  subjectEnglishName?: string;
  year: number;
  schoolYear?: string;
  description?: string;
  id: string;
  createdAt: string;
}

@Injectable()
export class DocumentSearchService extends SearchService<Document, IndexedDocument> {
  private static readonly schema: CollectionCreateSchema = {
    name: 'edocuments',
    fields: [
      { name: 'user', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'subjectName', type: 'string', optional: true },
      { name: 'subjectEnglishName', type: 'string', optional: true },
      { name: 'year', type: 'int32' },
      { name: 'schoolYear', type: 'string', optional: true },
      { name: 'description', type: 'string', optional: true },
      { name: 'createdAt', type: 'string' },
    ],
  };

  private readonly documents = client.collections<IndexedDocument>('edocuments').documents();

  constructor(
    @InjectRepository(Document) private readonly documentRepository: BaseRepository<Document>,
  ) { super(DocumentSearchService.schema, 'documents'); }

  @RequireTypesense()
  public async init(): Promise<void> {
    const documents = await this.documentRepository.find({}, { populate: ['file', 'file.user', 'subject'] });
    await super.init(documents, entity => this.toIndexedEntity(entity));
  }

  @RequireTypesense()
  public async add(document: Document): Promise<void> {
    await this.documents.create(this.toIndexedEntity(document));
  }

  @RequireTypesense()
  public async update(document: Document): Promise<void> {
    await this.documents.update(this.toIndexedEntity(document)).catch(authorizeNotFound);
  }

  @RequireTypesense()
  public async remove(documentId: string): Promise<void> {
    await this.documents.delete(documentId).catch(authorizeNotFound);
  }

  @RequireTypesense()
  public async search(queries: SearchParams): Promise<SearchResponse<IndexedDocument>> {
    return await this.documents.search(queries);
  }

  @RequireTypesense()
  public async searchAndPopulate(queries: SearchParams): Promise<SearchResponse<Document>> {
    const results = await this.documents.search(queries);

    if (results.hits?.length) {
      const documentIds = results.hits.map(hit => hit.document.id).map(Number);
      const documents = await this.documentRepository.find({ documentId: { $in: documentIds } });
      for (const hit of results.hits)
        // @ts-expect-error: This works, TypeScript... I know there is a mismatch between IndexedDocument.id and
        // Document.DocumentId. I know.
        hit.document = documents.find(document => document.documentId.toString() === hit.document.id)!;
    }
    // @ts-expect-error: Ditto.
    return results;
  }

  public toIndexedEntity(document: Document): IndexedDocument {
    return {
      user: document.file.user.userId,
      name: document.file.name,
      subjectName: document.studyDoc?.subject.name,
      subjectEnglishName: document.studyDoc?.subject.englishName,
      year: document.studyDoc?.year ?? document.infoDoc!.year,
      description: document.description,
      id: document.documentId.toString(),
      createdAt: document.createdAt.toString(),
    };
  }
}
