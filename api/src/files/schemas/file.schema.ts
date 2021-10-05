import path from 'path';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { uploadConfig } from '../../config';
import { User } from '../../users/user.schema';

@Schema({ timestamps: true })
export class Upload extends Document {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  author: User;

  @Prop()
  originalName: string;

  @Prop()
  fileSize: number;

  @Prop()
  type: string;

  @Prop()
  lastModified: Date;

  @Prop({ default: false })
  validated?: number;

  @Prop({ default: false })
  visible?: boolean;

  @Prop({ default: false })
  deleted?: boolean;

  @Prop()
  deletedDate?: Date;

  filePath: () => string;

  createdAt: Date;
  updatedAt: Date;
  _id: number;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);

UploadSchema.methods.filePath = function (): string {
  return path.join(uploadConfig.uploadPath, (this.id as string), (this.get('orginalName') as string));
};
