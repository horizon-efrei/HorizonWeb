import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import type { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { CurrentUser } from '../../shared/lib/decorators/current-user.decorator';
import { UploadInterceptor } from '../../shared/lib/decorators/upload-interceptor.decorator';
import { TypesenseEnabledGuard } from '../../shared/lib/guards/typesense-enabled.guard';
import { DocumentFilter } from '../../shared/lib/types/enums/docs-filters.enum';
import { FileKind } from '../../shared/lib/types/enums/file-kind.enum';
import type { Categories } from '../../shared/lib/utils/compute-document-categories';
import { Action, CheckPolicies } from '../../shared/modules/authorization';
import { normalizePagination } from '../../shared/modules/pagination';
import type { PaginatedResult } from '../../shared/modules/pagination';
import { SearchDto } from '../../shared/modules/search/search.dto';
import { User } from '../../users/user.entity';
import { FileUploadsService } from '../file-uploads/file-uploads.service';
import type { IndexedDocument } from './document-search.service';
import { DocumentSearchService } from './document-search.service';
import { DocumentsService } from './documents.service';
import { CategoryTypesDto } from './dto/category-types.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocsFilterDto } from './dto/docs-filter.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@ApiTags('Documents')
@Controller()
export class DocumentsController {
  constructor(
    private readonly studyDocsService: DocumentsService,
    private readonly studyDocSearchService: DocumentSearchService,
    private readonly filesService: FileUploadsService,
  ) {}

  @UploadInterceptor()
  @Post()
  @CheckPolicies(ability => ability.can(Action.Create, Document))
  public async createDocument(
    @CurrentUser() user: User,
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Document> {
    if (createDocumentDto.flags && !createDocumentDto.type.startsWith('exam'))
      throw new BadRequestException('Flags can only be set for exams');
    if (!createDocumentDto.flags && createDocumentDto.type.startsWith('exam'))
      throw new BadRequestException('Flags must be set for exams');
    if (!file)
      throw new BadRequestException('No file provided');

    const fileUpload = await this.filesService.create(
      user,
      file,
      FileKind.Document,
      createDocumentDto.fileLastModifiedAt,
    );
    return await this.studyDocsService.create(createDocumentDto, fileUpload);
  }

  @Get()
  @CheckPolicies(ability => ability.can(Action.Read, Document))
  public async findAllDocuments(
    @Query() query: DocsFilterDto,
  ): Promise<PaginatedResult<Document>> {
    return await this.studyDocsService.findAll(query, normalizePagination(query));
  }

  @Get('/categories')
  @CheckPolicies(ability => ability.can(Action.Read, Document))
  public async findCategories(
    @Query() categoriesTypesDto: CategoryTypesDto,
  ): Promise<Categories<Document>> {
    const defaultSort = [
      DocumentFilter.SchoolYear,
      DocumentFilter.Subject,
      DocumentFilter.Type,
      DocumentFilter.Year,
    ];
    return await this.studyDocsService.findCategories(categoriesTypesDto?.categories ?? defaultSort);
  }

  @UseGuards(TypesenseEnabledGuard)
  @Get('/search')
  @CheckPolicies(ability => ability.can(Action.Read, Document))
  public async search(
    @Query('full') full: boolean,
    @Query() query: SearchDto,
  ): Promise<SearchResponse<Document> | SearchResponse<IndexedDocument>> {
    if (full)
      return await this.studyDocSearchService.searchAndPopulate(query);
    return await this.studyDocSearchService.search(query);
  }

  @Get(':id')
  @CheckPolicies(ability => ability.can(Action.Read, Document))
  public async findOneDocument(@Param('id') id: string): Promise<Document> {
    return await this.studyDocsService.findOne(id);
  }

  @Patch(':id')
  @CheckPolicies(ability => ability.can(Action.Update, Document))
  public async updateDocument(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @CurrentUser() user: User,
  ): Promise<Document> {
    return await this.studyDocsService.update(user, id, updateDocumentDto);
  }

  @Delete(':id')
  @CheckPolicies(ability => ability.can(Action.Update, Document))
  public async removeDocument(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.studyDocsService.remove(user, id);
  }
}
