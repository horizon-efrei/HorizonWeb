import {
 IsArray, IsInt, IsOptional, IsString,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { CourseSubject } from '../schemas/course-subject.schema';

export class CreateCourseDocDto {
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
