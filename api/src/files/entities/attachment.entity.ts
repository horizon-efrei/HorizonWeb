import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
} from '@mikro-orm/core';
import { Post } from '../../posts/entities/post.entity';
import { Reply } from '../../replies/entities/reply.entity';
import { BaseEntity } from '../../shared/lib/entities/base.entity';
import { FileUpload } from './file-upload.entity';

type ContentOptions = { post: Post; reply?: never } | { reply: Reply; post?: never };

@Entity()
export class Attachment extends BaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  attachmentId: string;

  @OneToOne()
  file!: FileUpload;

  @ManyToOne()
  post?: Post;

  @ManyToOne()
  reply?: Reply;

  constructor(options: ContentOptions & { file: FileUpload }) {
    super();
    this.file = options.file;
    if (options.post)
      this.post = options.post;
    else if (options.reply)
      this.reply = options.reply;
  }
}
