import {
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/lib/entities/base.entity';
import { User } from '../users/user.entity';

@Entity()
export class Stat extends BaseEntity {
  @PrimaryKey()
  statId!: number;

  @OneToOne()
  user: User;

  @Property()
  nbPosts = 0;

  @Property()
  nbComments = 0;

  @Property()
  nbViews = 0;

  @Property()
  nbUploads = 0;

  constructor(options: { user: User }) {
    super();
    this.user = options.user;
  }
}
