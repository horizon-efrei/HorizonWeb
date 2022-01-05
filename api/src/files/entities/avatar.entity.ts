import { Entity, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/lib/entities/base.entity';
import { User } from '../../users/user.entity';
import { FileUpload } from './file-upload.entity';

@Entity()
export class Avatar extends BaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  avatarId!: string;

  @OneToOne()
  file!: FileUpload;

  @OneToOne()
  user!: User;

  constructor(options: { user: User; file: FileUpload }) {
    super();
    this.file = options.file;
    this.user = options.user;
  }
}
