import { IsDate, IsString } from 'class-validator';

export class CreateDailyInfosDto {
  @IsDate()
  date: Date;

  @IsString()
  content: string;
}
