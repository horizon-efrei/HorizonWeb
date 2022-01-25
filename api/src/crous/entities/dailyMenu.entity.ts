import {
  Collection,
 Entity, ManyToMany, PrimaryKey, Property,
} from '@mikro-orm/core';
import { TransformCollection } from '../../shared/lib/decorators/transform-collection.decorator';
import { BaseEntity } from '../../shared/lib/entities/base.entity';
import type { Food } from './food.entity';

@Entity()
export class DailyMenu extends BaseEntity {
  @PrimaryKey()
  menuId !: number;

  @ManyToMany()
  @TransformCollection()
  desserts = new Collection<Food>(this);

  @ManyToMany()
  @TransformCollection()
  dish = new Collection<Food>(this);

  @ManyToMany()
  @TransformCollection()
  entree = new Collection<Food>(this);

  @Property()
  date: Date;

  constructor(options: {
    date: Date;
  }) {
    super();
    this.date = options.date;
  }
}
