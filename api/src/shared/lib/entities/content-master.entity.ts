import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
// eslint-disable-next-line import/no-cycle
import { Content } from '../../../contents/entities/content.entity';
import type { Tag } from '../../../tags/tag.entity';
import type { User } from '../../../users/user.entity';
import { TransformCollection } from '../decorators/transform-collection.decorator';
import { ContentMasterType } from '../types/content-master-type.enum';
import { BaseEntity } from './base.entity';

@Entity({
  discriminatorColumn: 'kind',
  abstract: true,
})
export abstract class ContentMaster extends BaseEntity {
  @PrimaryKey()
  contentMasterId!: number;

  @ManyToMany()
  @TransformCollection()
  tags = new Collection<Tag>(this);

  @OneToOne()
  post?: Content;

  @ManyToMany()
  @TransformCollection()
  participants = new Collection<User>(this);

  @Enum(() => ContentMasterType)
  kind: ContentMasterType;

  @Property()
  isDraft = false;

  constructor(options: { post?: Content; isDraft?: boolean }) {
    super();
    if (options.post)
      this.post = options.post;
    if (typeof isDraft !== 'undefined')
      this.isDraft = options.isDraft;
  }
}
