import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { CourseSubject } from './course-subject.schema';
import { Upload } from './file.schema';

@Schema({ timestamps: true })
export class CourseDoc extends Document {
  @Prop({ required: true, type: Number, ref: 'Upload' })
  file: Upload;

  @Prop()
  year?: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'CourseSubject' })
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

export const CourseDocSchema = SchemaFactory.createForClass(CourseDoc);
