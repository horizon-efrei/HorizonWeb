import { createReadStream, promises as fs, constants as fsConst } from 'node:fs';
import { join } from 'node:path';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Response,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response as Res } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { uploadConfig } from '../config';
import { PaginateDto } from '../posts/dto/paginate.dto';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import type { CustomPaginateResult } from '../shared/pagination';
import { FileType } from '../shared/types/file-kinds.enum';
import { User } from '../users/user.schema';
import type { CreateFileUploadDto } from './dto/create-file-upload.dto';
import type { CreateStudyDocDto } from './dto/create-study-doc.dto';
import { UpdateStudyDocDto } from './dto/update-study-doc.dto';
import type { StudyDoc } from './schemas/study-doc.schema';
import { FilesService } from './services/file-uploads.service';
import { StudyDocsService } from './services/study-docs.service';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'files', version: '1' })
export class FilesController {
  constructor(private readonly studyDocsService: StudyDocsService, private readonly filesService: FilesService) {}

  // Create
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: uploadConfig.maxSize } }))
  @Post('/study-docs/upload')
  public async uploadCourseDocument(@CurrentUser() user: User,
  @Body() body: Partial<CreateFileUploadDto & CreateStudyDocDto>,
  @UploadedFile() file: Express.Multer.File): Promise<StudyDoc> {
    if (!file)
      throw new BadRequestException('No file has been provided.');

    const fileDocument = await this.filesService.create(user, {
      originalName: file.originalname,
      fileSize: file.size,
      fileKind: FileType.StudyDocs,
      type: file.mimetype,
      encoding: file.encoding,
      lastModified: body?.lastModified ?? new Date(),
    }, file, FileType.StudyDocs);

    return await this.studyDocsService.create(user, body as CreateStudyDocDto, fileDocument);
  }

  // Essais de crud

  // Read
  @Get('/study-docs/search')
  public async getAllUploads(
    @Query() query: PaginateDto,
  ): Promise<CustomPaginateResult<StudyDoc> | { items: StudyDoc[] }> {
    if (query.page) {
      return await this.studyDocsService.findAll({
        page: query.page,
        itemsPerPage: query.itemsPerPage ?? 10,
      }) as CustomPaginateResult<StudyDoc>;
    }
    const items = await this.studyDocsService.findAll() as StudyDoc[];
    return { items };
  }

  // Get file upload info
  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<StudyDoc> {
    return await this.studyDocsService.findOne(id);
  }

  // Update file upload info
  @Patch(':id')
  public async updateDoc(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDocDto: UpdateStudyDocDto,
  ): Promise<StudyDoc> {
    return await this.studyDocsService.update(user, id, updateCourseDocDto);
  }

  // Delete file upload info + file (TODO)
  @Delete(':id')
  public async remove(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.studyDocsService.remove(user, id);
  }

  // Get file
  @Get('/get-file/:id')
  public async getFile(@Param('id', ParseIntPipe) id: string, @Response({ passthrough: true }) res: Res): Promise<StreamableFile> {
    const fileDocument = await this.filesService.getUploadById(id);
    if (!fileDocument)
      throw new NotFoundException('File does not exist or has been removed from the database.');
    else if (fileDocument.deletedDate)
      throw new NotFoundException('File has been deleted.');

    const filePath = join(uploadConfig.uploadPath, fileDocument?.fileKind, fileDocument._id.toString());
    res.set({
      'content-type': fileDocument.type,
      'content-disposition': `attachment; filename="${fileDocument.originalName}"`,
    });
    return await fs.access(filePath, fsConst.F_OK)
    .then(() => new StreamableFile(createReadStream(filePath)))
    .catch(() => { throw new NotFoundException('File cannot be read, please try again later'); });
  }
}
