import { IsString, Matches } from 'class-validator';

export class CreateDailyInfoDto {
  @Matches(/^\d{4}-(?:0\d|1[0-2])-(?:[0-2]\d|3[01])$/, { message: 'date must be in format YYYY-MM-DD' })
  date: string;

  @IsString()
  content: string;

  public normalizeDates(): Omit<CreateDailyInfoDto, 'normalizeDates'> & { date: Date } {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { normalizeDates: _, ...keep } = this;
    return {
      ...keep,
      date: new Date(this.date),
    };
  }
}
