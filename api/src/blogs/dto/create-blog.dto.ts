import { IntersectionType, PickType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsLatLong,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { CreateOrphanContentDto } from '../../contents/dto/create-orphan-content.dto';
import { TagsDto } from '../../threads/dto/tags.dto';

export class CreateBlogDto extends IntersectionType(TagsDto, PickType(CreateOrphanContentDto, ['body'])) {
  @Length(15, 100)
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

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  isDraft: boolean;
}
