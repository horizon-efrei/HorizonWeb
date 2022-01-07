import {
  Entity,
  Enum,
  Index,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, Matches } from 'class-validator';
import { nanoid } from 'nanoid';
import { EMAIL_INCLUDED, OPAQUE_HEX_COLOR_REGEX } from '../shared/lib/constants';
import { BaseEntity } from '../shared/lib/entities/base.entity';
import { Role } from '../shared/modules/authorization/types/role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryKey()
  userId: string = nanoid(10);

  @Property({ type: 'text' })
  @Unique()
  @Index()
  username!: string;

  @Property({ type: 'text' })
  @Unique()
  @Index()
  @Expose({ groups: [EMAIL_INCLUDED] })
  email!: string;

  @Property({ type: 'text' })
  @Exclude()
  password!: string;

  // TODO: Add full 'reputation' support
  @Property({}) // Type : "integer"
  reputation = 0;

  // TODO: Add full 'avatar' support
  @Property({ type: 'text' })
  avatarImageFilename?: string;

  @Enum({ items: () => Role, array: true, default: [Role.User] })
  roles: Role[] = [Role.User];

  @IsNotEmpty()
  @Matches(OPAQUE_HEX_COLOR_REGEX)
  @Transform(({ value }: { value: string }) => (value?.startsWith('#') ? value.slice(1) : value))
  @Property({ type: 'text' })
  color?: string;

  @Property({ type: 'text' })
  signature?: string;

  @Property({ type: 'text' })
  bannerImageFilename?: string;

  constructor(username: string, email: string) {
    super();
    this.username = username;
    this.email = email;
  }

  public async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
