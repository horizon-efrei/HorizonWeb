import {
 IsArray, IsDate,
} from 'class-validator';

export class CreateDailyMenuDto {
  @IsDate()
  date: Date;

  @IsArray()
  starters: number[];

  @IsArray()
  dishes: number[];

  @IsArray()
  desserts: number[];
}
