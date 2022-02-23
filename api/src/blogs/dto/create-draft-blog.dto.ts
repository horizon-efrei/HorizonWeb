import { IntersectionType, PickType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsLatLong,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateOrphanContentDto } from '../../contents/dto/create-orphan-content.dto';
import { TagsDto } from '../../threads/dto/tags.dto';

  export class CreateDraftBlogDto extends IntersectionType(TagsDto, PickType(CreateOrphanContentDto, ['body'])) {
    @IsString()
    title: string;

    @IsOptional()
    @IsLatLong()
    location?: string;

    @IsOptional()
    @IsString()
    locationName?: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsString()
    category: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags: string[];
  }
