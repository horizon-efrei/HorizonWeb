import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { IsEnum, IsString } from 'class-validator';
import { CreateOrphanContentDto } from '../../contents/dto/create-orphan-content.dto';
import { ThreadType } from '../../shared/lib/types/thread-type.enum';
import { AssigneesDto } from './assignees.dto';
import { TagsDto } from './tags.dto';

export class CreateDraftThreadDto extends IntersectionType(AssigneesDto, TagsDto, PickType(CreateOrphanContentDto, ['body'])) {
  @IsString()
  title: string;

  @IsEnum(ThreadType)
  type: ThreadType;
}
