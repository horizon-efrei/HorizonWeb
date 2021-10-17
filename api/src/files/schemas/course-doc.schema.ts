import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CourseSubject } from './course-subject.schema';
import { Upload } from './file.schema';

@Schema({ timestamps: true })
export class CourseDoc extends Document {
  @Prop({ required: true, type: Number, ref: 'Upload' })
  file: Upload;

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

export const CourseDocSchema = SchemaFactory.createForClass(CourseDoc);
