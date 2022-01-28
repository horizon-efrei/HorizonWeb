import {
  Entity,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../shared/lib/entities/base.entity';

@Entity()
export class DailyInfo extends BaseEntity {
  @PrimaryKey()
  infoId!: number;

  @Property({ type: 'text' })
  content!: string;

  @Property()
  @Unique()
  date!: Date;

  constructor(options: {
    content: string;
    date: Date;
  }) {
    super();
    this.content = options.content;
    this.date = options.date;
  }
}
