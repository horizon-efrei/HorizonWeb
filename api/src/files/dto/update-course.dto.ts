import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { CourseSubject } from '../schemas/course-subject.schema';
import { CreateCourseDocDto } from './create-course-doc.dto';

export class UpdateCourseDocsDto extends PartialType(CreateCourseDocDto) {
  @IsNumber()
  @IsOptional()
  year: number;

  @IsString()
  @IsOptional()
  tags: string[];

  @IsString()
  @IsOptional()
  docName: string;

  @IsOptional()
  @IsObjectId()
  subject: CourseSubject;

  @IsString()
  @IsOptional()
  description: string;
}