import {
 IsArray, IsDate, IsNumber,
} from 'class-validator';

export class CreateDailyMenuDto {
  @IsDate()
  date: Date;

  @IsArray()
  @IsNumber()
  entree: number[];

  @IsArray()
  @IsNumber()
  dish: number[];

  @IsArray()
  @IsNumber()
  desserts: number[];
}
