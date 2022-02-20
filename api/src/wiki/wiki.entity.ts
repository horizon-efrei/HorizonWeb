import {
  Entity,
  // Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/lib/entities/base.entity';
// Import { Colors } from '../shared/lib/types/colors.enum';

@Entity()
export class Wiki extends BaseEntity {
  @PrimaryKey({ type: 'number' })
  wikiPageId!: number;

  @Property({ type: 'text' })
  title?: string;

  body?: string;
  category?: string;
  hidden?: boolean;

  constructor(options: { wikiPageId: number; title?: string; body?: string; category?: string; hidden?: boolean }) {
    super();
    this.wikiPageId = options.wikiPageId;
    this.title = options.title;
    this.body = options.body;
    this.category = options.category;
    this.hidden = options.hidden;
  }
}
