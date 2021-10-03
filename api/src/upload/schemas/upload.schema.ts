import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { File } from './file.schema';
import { Subject } from './subject.schema';
import { User } from '../../users/user.schema';

@Schema({ timestamps: true })
export class Upload extends Document {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'File' })
  uploadFile: File;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  uploadAuthor: User;

  @Prop()
  uploadYear: number;

  @Prop()
  uploadFileType: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Subject' })
  uploadSubject: Subject;

  @Prop()
  uploadTags: [string];

  @Prop()
  uploadName: string;

  @Prop()
  description?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);