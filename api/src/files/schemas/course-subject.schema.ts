import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CourseSubject extends Document {
  @Prop()
  courseCode: string;

  @Prop()
  fullName: string;

  @Prop()
  fullEnglishName: string;

  @Prop()
  description?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(CourseSubject);
