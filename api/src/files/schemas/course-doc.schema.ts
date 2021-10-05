import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from '../../users/user.schema';
import { CourseSubject } from './course-subject.schema';
import { Upload } from './file.schema';

@Schema({ timestamps: true })
export class CourseDoc extends Document {
  @Prop({ required: true, type: Number, ref: 'File' })
  file: Upload;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  author: User;

  @Prop()
  year?: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Subject' })
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
