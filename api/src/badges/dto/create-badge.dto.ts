import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
} from 'class-validator';
import { Level } from '../../shared/lib/types/level.enum';

export class CreateBadgeDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsInt()
  @IsNumber()
  value: number;

  @IsEnum(Level)
  level: Level;

  @IsString()
  iconFilename: string;

  @IsString()
  serie: string;


  @IsString()
  category: string;
}
