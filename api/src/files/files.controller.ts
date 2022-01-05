import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Response,
  StreamableFile,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Express, Response as Res } from 'express';
import { createReadStream, promises as fs, constants as fsConst } from 'node:fs';
import path from 'node:path';
import { config } from '../config';
import { CurrentUser } from '../shared/lib/decorators/current-user.decorator';
import { UploadInterceptor } from '../shared/lib/decorators/upload-interceptor.decorator';
import { FileKind } from '../shared/lib/types/file-kind.enum';
import { Action, CheckPolicies, PoliciesGuard } from '../shared/modules/authorization';
import { PaginateDto } from '../shared/modules/pagination/paginate.dto';
import type { PaginatedResult } from '../shared/modules/pagination/pagination.interface';
import { User } from '../users/user.entity';
import { CreateStudyDocDto } from './dto/create-study-doc.dto';
import { UpdateStudyDocDto } from './dto/update-study-doc.dto';
import { StudyDoc } from './entities/study-doc.entity';
import { FileUploadsService } from './services/file-uploads.service';
import { StudyDocsService } from './services/study-docs.service';

@ApiTags('File')
@UseGuards(PoliciesGuard)
@Controller({ path: 'files' })
export class FilesController {
  constructor(
    private readonly studyDocsService: StudyDocsService,
    private readonly filesService: FileUploadsService,
  ) {}

  @Get('/uploads/:id')
  public async findFile(
    @Param('id', ParseUUIDPipe) id: string,
    @Response({ passthrough: true }) res: Res,
  ): Promise<StreamableFile> {
    const file = await this.filesService.findOne(id);

    res.set({
      /* eslint-disable @typescript-eslint/naming-convention */
      'Content-Type': file.mimeType,
      'Content-Disposition': `attachment; filename="${file.originalName}"`,
      /* eslint-enable @typescript-eslint/naming-convention */
    });

    return await fs.access(file.getPath(), fsConst.F_OK)
      .then(() => new StreamableFile(createReadStream(file.getPath())))
      .catch(() => { throw new InternalServerErrorException('File cannot be read'); });
  }

  @UploadInterceptor()
  @Post('/study-docs')
  @CheckPolicies(ability => ability.can(Action.Create, StudyDoc))
  public async create(
    @CurrentUser() user: User,
    @Body() createStudyDocDto: CreateStudyDocDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<StudyDoc> {
    if (!file)
      throw new BadRequestException('No file provided');

    const fileUpload = await this.filesService.create(
      user,
      file,
      FileKind.StudyDoc,
      createStudyDocDto.fileLastModifiedAt,
    );
    return await this.studyDocsService.create(createStudyDocDto, fileUpload);
  }

  @Get('/study-docs')
  @CheckPolicies(ability => ability.can(Action.Read, StudyDoc))
  public async findAll(@Query() query: PaginateDto): Promise<PaginatedResult<StudyDoc>> {
    if (query.page)
      return await this.studyDocsService.findAll({ page: query.page, itemsPerPage: query.itemsPerPage ?? 10 });
    return await this.studyDocsService.findAll();
  }

  @Get('/study-docs/:id')
  @CheckPolicies(ability => ability.can(Action.Read, StudyDoc))
  public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<StudyDoc> {
    return await this.studyDocsService.findOne(id);
  }

  @Patch('/study-docs/:id')
  @CheckPolicies(ability => ability.can(Action.Update, StudyDoc))
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudyDocDto: UpdateStudyDocDto,
    @CurrentUser() user: User,
  ): Promise<StudyDoc> {
    return await this.studyDocsService.update(user, id, updateStudyDocDto);
  }

  @Delete('/study-docs/:id')
  @CheckPolicies(ability => ability.can(Action.Update, StudyDoc))
  public async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.studyDocsService.remove(user, id);
  }
}
