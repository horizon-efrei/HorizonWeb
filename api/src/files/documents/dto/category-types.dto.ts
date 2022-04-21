import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { DocumentFilter } from '../../../shared/lib/types/enums/docs-filters.enum';

export class CategoryTypesDto {
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  @IsArray()
  // TODO
  @IsEnum(DocumentFilter, { each: true })
  categories?: DocumentFilter[];
}
