import {
  ArrayType,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/lib/entities/base.entity';

@Entity()
export class Club extends BaseEntity {
  @PrimaryKey()
  clubId!: number;

  @Property({ type: 'text' })
  slug!: string;

  @Property({ type: 'text' })
  clubName!: string;

  @Property({ type: 'text' })
  clubType!: string;

  @Property({ type: 'text' })
  clubDescription!: string;

  @Property({ type: 'text' })
  iconFilename!: string;

  @Property({ type: ArrayType })
  socials!: string[];

  @Property()
  membersCount = 0;

  constructor(options: {
    clubName: string;
    slug: string;
    clubType: string;
    clubDescription: string;
    iconFilename: string;
    socials: string[];
  }) {
    super();
    this.clubName = options.clubName;
    this.slug = options.slug;
    this.clubType = options.clubType;
    this.clubDescription = options.clubDescription;
    this.iconFilename = options.iconFilename;
    this.socials = options.socials;
  }
}
