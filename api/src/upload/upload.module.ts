import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import type { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/users.module';
import { UploadService } from './services/upload.service';
import { FileService } from './services/file.service';
import { SubjectService } from './services/subject.service';

import { UploadController } from './upload.controller';

import { Upload, UploadSchema } from './schemas/upload.schema';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { File, FileSchema } from './schemas/file.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Upload.name,
        useFactory: (): Schema => {
          const schema = UploadSchema;
          schema.plugin(autoIncrement, { model: 'Upload', startAt: 1 });
          schema.plugin(paginate);
          return schema;
        },
      },
    ]),
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Subject.name,
        schema: SubjectSchema,
      },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [UploadController],
  providers: [UploadService, FileService, SubjectService],
  exports: [UploadService],
})
export class UploadModule { }