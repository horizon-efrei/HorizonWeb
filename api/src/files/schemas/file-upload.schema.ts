import path from 'path';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { uploadConfig } from '../../config';
import { FileType } from '../../shared/types/file-types.enum';
import { User } from '../../users/user.schema';

@Schema({ timestamps: true })
export class FileUpload extends Document {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  author: User;

  @Prop()
  encoding: string;

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

  @Prop({ default: null })
  deletedDate?: Date;

  @Prop({ default: FileType.Unknown })
  fileKind: string;

  filePath: () => string;

  createdAt: Date;
  _id: number;
}

export const FileUploadSchema = SchemaFactory.createForClass(FileUpload);

FileUploadSchema.methods.filePath = function (): string {
  return path.join(uploadConfig.uploadPath, this.fileKind, this._id.toString());
};
