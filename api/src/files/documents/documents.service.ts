import type { FilterQuery } from '@mikro-orm/core';
import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { DocumentKind } from 'src/shared/lib/types/enums/file-kind.enum';
import { BaseRepository } from '../../shared/lib/repositories/base.repository';
import { Cursus } from '../../shared/lib/types/enums/cursus.enum';
import type { DocumentFilter } from '../../shared/lib/types/enums/docs-filters.enum';
import { SchoolYear } from '../../shared/lib/types/enums/school-year.enum';
import { assertPermissions } from '../../shared/lib/utils/assert-permission';
import type { Categories, GroupFilters } from '../../shared/lib/utils/compute-document-categories';
import { computeDocumentCategories } from '../../shared/lib/utils/compute-document-categories';
import { Action } from '../../shared/modules/authorization';
import { CaslAbilityFactory } from '../../shared/modules/casl/casl-ability.factory';
import type { PaginatedResult, PaginateDto } from '../../shared/modules/pagination';
import { Subject } from '../../subjects/subject.entity';
import type { User } from '../../users/user.entity';
import { DocSeries } from '../doc-series/doc-series.entity';
import type { FileUpload } from '../file-uploads/file-upload.entity';
import { DocumentSearchService } from './document-search.service';
import type { CreateDocumentDto } from './dto/create-document.dto';
import type { DocsFilterDto } from './dto/docs-filter.dto';
import type { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { InfoDoc } from './entities/info-doc.entity';
import { StudyDoc } from './entities/study-doc.entity';

@Injectable()
export class DocumentsService {
  // eslint-disable-next-line max-params
  constructor(
    @InjectRepository(StudyDoc) private readonly studyDocRepository: BaseRepository<StudyDoc>,
    @InjectRepository(InfoDoc) private readonly infoDocRepository: BaseRepository<InfoDoc>,
    @InjectRepository(Document) private readonly documentRepository: BaseRepository<Document>,
    @InjectRepository(Subject) private readonly subjectRepository: BaseRepository<Subject>,
    @InjectRepository(DocSeries) private readonly docSeriesRepository: BaseRepository<DocSeries>,
    private readonly documentSearchService: DocumentSearchService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  public async create(createDocumentDto: CreateDocumentDto, file: FileUpload): Promise<Document> {
    const subject = await this.subjectRepository.findOneOrFail({ subjectId: createDocumentDto.subject });

    const docSeries = await this.docSeriesRepository.findOne({ docSeriesId: createDocumentDto.docSeries });

    let document: Document;
    switch (createDocumentDto.kind) {
      case DocumentKind.Study: {
        const studyDoc = new StudyDoc({
          ...createDocumentDto,
          subject,
        });
        await this.studyDocRepository.persistAndFlush(studyDoc);

        document = new Document({
          ...createDocumentDto,
          file,
          studyDoc,
          docSeries,
        });
        break;
      }
      case DocumentKind.Info: {
        const infoDoc = new InfoDoc(createDocumentDto);
        await this.infoDocRepository.persistAndFlush(infoDoc);

        document = new Document({
          ...createDocumentDto,
          file,
          infoDoc,
          docSeries,
        });
        break;
      }
    }

    await this.documentRepository.persistAndFlush(document);
    await this.documentSearchService.add(document);
    return document;
  }

  public async findAll(
    filters: DocsFilterDto,
    paginationOptions?: Required<PaginateDto>,
  ): Promise<PaginatedResult<Document>> {
    // TODO: Maybe the user won't have access to all docs. There can be some restrictions
    // (i.e. "sensitive"/"deprecated" docs)
    let options: FilterQuery<Document> = {};
    if (typeof filters.schoolYear !== 'undefined')
      options = { studyDoc: { subject: { schoolYear: filters.schoolYear } } };
    if (typeof filters.year !== 'undefined')
      options = { ...options, studyDoc: { year: filters.year }, infoDoc: { year: filters.year } };
    if (typeof filters.subject !== 'undefined')
      // @ts-expect-error: ts(2339)
      options = { ...options, studyDoc: { subject: { ...options.subject, subjectId: filters.subject } } };
    if (typeof filters.type !== 'undefined')
      options = { ...options, type: filters.type };
    if (typeof filters.cursus !== 'undefined')
      options = { ...options, cursus: { $in: [filters.cursus, Cursus.All] } };

    return await this.documentRepository.findWithPagination(
      paginationOptions,
      options,
      { populate: ['file', 'file.user', 'studyDoc', 'studyDoc.subject', 'infoDoc', 'docSeries'] },
    );
  }

  public async findCategories(baseFilters: DocumentFilter[]): Promise<Categories<Document>> {
    const allDocuments: Document[] = await this.studyDocRepository.findAll({ populate: ['subject'] });

    const groupFilters: GroupFilters<Document> = {
      schoolYear: elt => ({ key: elt.subject.schoolYear.toString(), metadata: SchoolYear[elt.subject.schoolYear] }),
      subject: elt => ({ key: elt.subject.subjectId.toString(), metadata: elt.subject.name }),
      type: elt => ({ key: elt.type.toString(), metadata: null }),
      year: elt => ({ key: elt.year.toString(), metadata: null }),
    } as const;

    return computeDocumentCategories(allDocuments, groupFilters, baseFilters);
  }

  public async findOne(studyDocId: string): Promise<Document> {
    // TODO: Maybe the user won't have access to this doc. There can be some restrictions
    // (i.e. "sensitive"/"deprecated" docs)
    return await this.studyDocRepository.findOneOrFail(
      { studyDocId },
      { populate: ['file', 'file.user', 'subject', 'docSeries'] },
    );
  }

  public async update(user: User, studyDocId: string, updateCourseDto: UpdateDocumentDto): Promise<Document> {
    const studyDoc = await this.studyDocRepository.findOneOrFail(
      { studyDocId },
      { populate: ['file', 'file.user', 'subject', 'docSeries'] },
    );

    const ability = this.caslAbilityFactory.createForUser(user);
    assertPermissions(ability, Action.Update, studyDoc);

    const subject = await this.subjectRepository.findOneOrFail({ subjectId: updateCourseDto.subject });
    const docSeries = await this.docSeriesRepository.findOneOrFail({ docSeriesId: updateCourseDto.docSeries });

    wrap(studyDoc).assign({ ...updateCourseDto, subject, docSeries });
    await this.studyDocRepository.flush();
    await this.documentSearchService.update(studyDoc);
    return studyDoc;
  }

  public async remove(user: User, studyDocId: string): Promise<void> {
    const studyDoc = await this.studyDocRepository.findOneOrFail({ studyDocId }, { populate: ['file', 'file.user'] });

    const ability = this.caslAbilityFactory.createForUser(user);
    assertPermissions(ability, Action.Delete, studyDoc);

    await this.studyDocRepository.removeAndFlush(studyDoc);
    await this.documentSearchService.remove(studyDoc.studyDocId);
  }

x;
}
