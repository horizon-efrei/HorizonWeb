import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { User } from '../users/user.schema';
import type { CreateCourseDocDto } from './dto/create-course-doc.dto';
import type { CourseDoc } from './schemas/course-doc.schema';
import { CourseDocService } from './services/course-doc.service';
import { UploadInterceptor } from './upload.interceptor';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'files', version: '1' })
export class FilesController {
  constructor(private readonly courseDocService: CourseDocService) {}

  @UseInterceptors(UploadInterceptor)
  @Post('/course-docs/upload')
  public async uploadCourseDocument(@Req() req: Request): Promise<CourseDoc> {
    const { body } = req;
    if (!body.fileDocument)
      throw new BadRequestException('No file has been provided.');

    return await this.courseDocService.create(req?.user as User, body as CreateCourseDocDto);
  }
}
