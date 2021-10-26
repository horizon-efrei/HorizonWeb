import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CourseSubject } from './course-subject.schema';
import { FileUpload } from './file-upload.schema';

@Schema({ timestamps: true })
export class StudyDoc extends Document {
  @Prop({ required: true, type: Number, ref: 'FileUpload' })
  file: FileUpload;

  @Prop()
  year?: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'CourseSubject' })
  subject?: CourseSubject;

  @Prop()
  tags?: string[];

  @Prop()
  docName?: string;

  @Prop()
  description?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const StudyDocSchema = SchemaFactory.createForClass(StudyDoc);
