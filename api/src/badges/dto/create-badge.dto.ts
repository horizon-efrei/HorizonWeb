import {
  IsEnum,
  IsInt,
  IsString,
} from 'class-validator';
import { BadgeLevel } from '../../shared/lib/types/badge-level.enum';

export class CreateBadgeDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsInt()
  value: number;

  @IsInt()
  limit: number;

  @IsEnum(BadgeLevel)
  level: BadgeLevel;

  @IsString()
  icon: string;

  @IsString()
  serie: string;

  @IsString()
  stat: string;
}
