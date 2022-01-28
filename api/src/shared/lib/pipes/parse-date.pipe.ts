import type { PipeTransform } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isISO8601 } from 'class-validator';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  public transform(value: string): Date {
    if (value === 'today')
      return new Date();
    if (typeof value === 'string' && isISO8601(value))
      return new Date(value);

    throw new BadRequestException('Validation failed (ISO 8601 date is expected)');
  }
}
