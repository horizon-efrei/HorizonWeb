import {
  Cascade,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/lib/entities/base.entity';
import { DocSeries } from '../../doc-series/doc-series.entity';
import { FileUpload } from '../../file-uploads/file-upload.entity';
import { InfoDoc } from './info-doc.entity';
import { StudyDoc } from './study-doc.entity';

type DocumentType =
  | { infoDoc: InfoDoc; studyDoc?: null }
  | { infoDoc?: null; studyDoc: StudyDoc };

@Entity()
export class Document extends BaseEntity {
  @PrimaryKey()
  documentId: number;

  @OneToOne({ onDelete: 'CASCADE' })
  file!: FileUpload;

  @ManyToOne({ onDelete: 'CASCADE' })
  docSeries?: DocSeries;

  @OneToOne({ onDelete: 'CASCADE', cascade: [Cascade.PERSIST, Cascade.REMOVE] })
  infoDoc?: InfoDoc;

  @OneToOne({ onDelete: 'CASCADE', cascade: [Cascade.PERSIST, Cascade.REMOVE] })
  studyDoc?: StudyDoc;

  @Property({ type: 'text' })
  description?: string;

  @Property()
  isObsolete = false;

  constructor(options: DocumentType & {
    file: FileUpload;
    docSeries?: DocSeries | null;
    description?: string;
    isObsolete?: boolean;
  }) {
    super();

    this.file = options.file;
    if (options.docSeries)
      this.docSeries = options.docSeries;
    if (options.description)
      this.description = options.description;
    if (options.isObsolete)
      this.isObsolete = options.isObsolete;

    if (options.infoDoc)
      this.infoDoc = options.infoDoc;
    else if (options.studyDoc)
      this.studyDoc = options.studyDoc;
  }
}
