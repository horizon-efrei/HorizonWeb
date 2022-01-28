import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { PaginateDto } from 'src/shared/modules/pagination/paginate.dto';
  import { SchoolYear } from '../../../shared/lib/types/school-year.enum';
  
  export class DocsFilterDto extends PaginateDto {
    @IsOptional()
    @IsEnum(SchoolYear)
    schoolYear?: SchoolYear;
  
    @IsOptional()
    @IsInt()
    year?: number;
  }
  