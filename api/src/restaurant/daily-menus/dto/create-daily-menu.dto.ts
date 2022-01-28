import { IsArray, Matches } from 'class-validator';

export class CreateDailyMenuDto {
  @Matches(/^\d{4}-(?:0\d|1[0-2])-(?:[0-2]\d|3[01])$/, { message: 'date must be in format YYYY-MM-DD' })
  date: string;

  @IsArray()
  starters: number[];

  @IsArray()
  dishes: number[];

  @IsArray()
  desserts: number[];

  public normalizeDates(): Omit<CreateDailyMenuDto, 'normalizeDates'> & { date: Date } {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { normalizeDates: _, ...keep } = this;
    return {
      ...keep,
      date: new Date(this.date),
    };
  }
}
