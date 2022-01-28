import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/lib/entities/base.entity';

@Entity()
export class DailyInfos extends BaseEntity {
  @PrimaryKey()
  infoId !: number;

  @Property({ type: 'text' })
  content !: string;

  @Property()
  date !: Date;

  constructor(options: {
    content: string;
    date: Date;
  }) {
    super();
    this.content = options.content;
    this.date = options.date;
  }
}
