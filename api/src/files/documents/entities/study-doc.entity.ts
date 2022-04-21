import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/lib/entities/base.entity';
import { Cursus } from '../../../shared/lib/types/enums/cursus.enum';
import { StudyDocType } from '../../../shared/lib/types/enums/study-doc-type.enum';
import { Subject } from '../../../subjects/subject.entity';

@Entity()
export class StudyDoc extends BaseEntity {
  @PrimaryKey()
  studyDocId: number;

  @Property()
  year: number;

  @ManyToOne()
  subject!: Subject;

  @Enum(() => Cursus)
  cursus!: Cursus;

  @Enum(() => StudyDocType)
  type!: StudyDocType;

  @Property({ type: 'smallint' })
  flags = 0;

  constructor(options: {
    year: number;
    subject: Subject;
    cursus: Cursus;
    type: StudyDocType;
    flags?: number;
  }) {
    super();
    this.year = options.year;
    this.subject = options.subject;
    this.cursus = options.cursus;
    this.type = options.type;
    if (options.flags)
      this.flags = options.flags;
  }
}
