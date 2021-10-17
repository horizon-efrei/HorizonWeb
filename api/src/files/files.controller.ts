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
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createReadStream, promises as fs, constants as fsConst } from 'fs';
import { join } from 'node:path';
import { PaginateDto } from 'src/posts/dto/paginate.dto';
import { CustomPaginateResult } from 'src/shared/pagination';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { uploadConfig } from '../config';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../users/user.schema';
import type { CreateCourseDocDto } from './dto/create-course-doc.dto';
import type { CreateUploadDto } from './dto/create-file.dto';
import { UpdateCourseDocsDto } from './dto/update-course.dto';
import type { CourseDoc } from './schemas/course-doc.schema';
import { CourseDocsService } from './services/course-docs.service';
import { FilesService } from './services/files.service';


@UseGuards(JwtAuthGuard)
@Controller({ path: 'files', version: '1' })
export class FilesController {
  constructor(private readonly courseDocsService: CourseDocsService, private readonly filesService: FilesService) {}

  // Create
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: uploadConfig.maxSize } }))
  @Post('/course-docs/upload')
  public async uploadCourseDocument(@CurrentUser() user: User,
  @Body() body: Partial<CreateCourseDocDto & CreateUploadDto>,
  @UploadedFile() file: Express.Multer.File): Promise<CourseDoc> {
    console.log("receive");
    if (!file)
      throw new BadRequestException('No file has been provided.');

    console.log("good");
    const fileDocument = await this.filesService.create(user, {
      originalName: file.originalname,
      fileSize: file.size,
      type: file.mimetype,
      encoding: file.encoding,
      lastModified: body?.lastModified ?? new Date(),
    }, file);
    console.log("creatad2");
    return await this.courseDocsService.create(user, body as CreateCourseDocDto, fileDocument);
  }

  // essais de crud
  
  // Read
  @Get('/course-docs/search')
  public async getAllUploads(@Query() query: PaginateDto): Promise<CustomPaginateResult<CourseDoc> | { items: CourseDoc[] }>  {
    if (query.page) {
      return await this.courseDocsService.findAll({
        page: query.page,
        itemsPerPage: query.itemsPerPage ?? 10,
      }) as CustomPaginateResult<CourseDoc>;
    }
    const items = await this.courseDocsService.findAll() as CourseDoc[];
    return { items };
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<CourseDoc> {
    return await this.courseDocsService.findOne(id);
  }
  
  // Update
  @Patch(':id')
  public async updateDoc(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDocDto: UpdateCourseDocsDto,
  ): Promise<CourseDoc> {
    return this.courseDocsService.update(user, id, updateCourseDocDto);
  }
  
  // Delete
  @Delete(':id')
  public async remove(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.courseDocsService.remove(user, id);
  }

  @Get('/download/:id/:file_name')
  public async getFile(@Param('id', ParseIntPipe) id: number, @Param('file_name') fileName: string): Promise<StreamableFile> {
    const filePath = join(process.cwd(), `uploads/${id}/${fileName}`);
    return await fs.access(filePath, fsConst.F_OK)
    .then(() => {
      return new StreamableFile(createReadStream(join(process.cwd(), `uploads/${id}/${fileName}`)));
    })
    .catch(() => { throw new NotFoundException('File does not exist'); })
  }
}
