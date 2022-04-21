import {
  Entity,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/lib/entities/base.entity';
import { SchoolYear } from '../../../shared/lib/types/enums/school-year.enum';

@Entity()
export class InfoDoc extends BaseEntity {
  @PrimaryKey()
  infoDocId: number;

  @Enum({ items: () => SchoolYear, array: true, default: [] })
  schoolYear: SchoolYear[];

  @Property()
  year: number;

  constructor(options: {
    year: number;
    schoolYear: SchoolYear[];
  }) {
    super();
    this.schoolYear = options.schoolYear;
    this.year = options.year;
  }
}
