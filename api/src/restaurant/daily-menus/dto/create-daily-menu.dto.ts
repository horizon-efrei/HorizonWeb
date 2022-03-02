import { IsArray, Matches } from 'class-validator';
import { iso8601Regex } from '../../../shared/lib/utils/iso-8601-date';

export class CreateDailyMenuDto {
  @Matches(iso8601Regex, { message: 'date must be in format YYYY-MM-DD' })
  date: string;

  @IsArray()
  starters: number[];

  @IsArray()
  dishes: number[];

  @IsArray()
  desserts: number[];
}
