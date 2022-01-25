import {
 IsArray, IsDate,
} from 'class-validator';

export class CreateDailyMenuDto {
  @IsDate()
  date: Date;

  @IsArray()
  entree: number[];

  @IsArray()
  dish: number[];

  @IsArray()
  desserts: number[];
}
