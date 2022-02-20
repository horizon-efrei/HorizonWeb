import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Colors } from '../../shared/lib/types/colors.enum';

const tagRegex = /^[\d:a-z-]+$/;

export class CreateWikiDto {
  @Length(1, 50)
  @Matches(tagRegex)
  @IsString()
  wikiPageId!: number;
  

  @IsOptional()
  @IsString()
  title?: string;
  body?: string;
  category?: string;
  hidden?: boolean;
}
