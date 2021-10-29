import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CourseSubject extends Document {
  @Prop()
  courseCode: string;

  @Prop()
  name: string;

  @Prop()
  englishName: string;

  @Prop()
  description?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(CourseSubject);
