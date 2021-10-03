import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Subject extends Document {
  @Prop()
  subjectId: string;

  @Prop()
  subjectName: string;

  @Prop()
  subjectEnglishName: string;

  @Prop()
  description?: string;

  @Prop()
  forPromotion: string;

  @Prop()
  forSemester: number;

  createdAt: Date;
  updatedAt: Date;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

