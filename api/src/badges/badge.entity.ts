import {
  Entity,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/lib/entities/base.entity';
import { BadgeLevel } from '../shared/lib/types/badge-level.enum';

@Entity()
export class Badge extends BaseEntity {
  @PrimaryKey({ type: 'text' })
  slug!: string;

  @Property({ type: 'text' })
  name!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property()
  value!: number;

  @Enum(() => BadgeLevel)
  level!: BadgeLevel;

  // TODO: Add full 'icon' support
  @Property({ type: 'text' })
  icon!: string;

  @Property({ type: 'text' })
  serie!: string;

  @Property({ type: 'text' })
  stat!: string;

  @Property()
  limit!: number;

  constructor(options: {
    name: string;
    slug: string;
    description: string;
    value: number;
    level: BadgeLevel;
    icon: string;
    serie: string;
    stat: string;
    limit: number;
  }) {
    super();
    this.name = options.name;
    this.slug = options.slug;
    this.description = options.description;
    this.value = options.value;
    this.level = options.level;
    this.icon = options.icon;
    this.serie = options.serie;
    this.stat = options.stat;
    this.limit = options.limit;
  }
}
