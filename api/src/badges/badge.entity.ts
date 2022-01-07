import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/lib/entities/base.entity';
import { Level } from '../shared/lib/types/level.enum';

@Entity()
export class Badge extends BaseEntity {
  @PrimaryKey({ type: 'text' })
  name!: string;

  @Property({ type: 'text' })
  slug!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property()
  value!: number;

  @Property({})
  level!: Level;

  @Property({ type: 'text' })
  iconFilename!: string;

  @Property({ type: 'text' })
  serie!: string;

  @Property({ type: 'text' })
  category!: string;

  constructor(options: {
    name: string;
    slug: string;
    description: string;
    value: number;
    level: Level;
    iconFilename: string;
    serie: string;
    category: string;
  }) {
    super();
    this.name = options.name;
    this.slug = options.slug;
    this.description = options.description;
    this.value = options.value;
    this.level = options.level;
    this.iconFilename = options.iconFilename;
    this.serie = options.serie;
    this.category = options.category;
  }
}
