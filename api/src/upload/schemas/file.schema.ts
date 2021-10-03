import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class File extends Document {
  @Prop()
  fileOriginalName: string;

  @Prop()
  fileSize: number;

  @Prop()
  fileType: string;

  @Prop()
  fileLastModified: Date;

  @Prop()
  fileDeleted: Boolean;

  @Prop()
  fileDeletedDate?: Date;

  @Prop()
  filePath: string;

  createdAt: Date;
  updatedAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);