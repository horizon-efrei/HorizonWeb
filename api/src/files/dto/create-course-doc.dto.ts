import {
 IsArray, IsInt, IsNotEmpty, IsObject, IsOptional, IsString,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { CourseSubject } from '../schemas/course-subject.schema';
import { Upload } from '../schemas/file.schema';

export class CreateCourseDocDto {
    @IsNotEmpty()
    @IsObject()
    fileDocument: Upload;

    @IsOptional()
    @IsInt()
    year?: number;

    @IsOptional()
    @IsObjectId()
    subject?: CourseSubject;

    @IsOptional()
    @IsArray()
    tags?: string[];

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;
}
