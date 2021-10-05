import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import type { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/users.module';
import { FilesController } from './files.controller';
import { CourseDoc, CourseDocSchema } from './schemas/course-doc.schema';
import { CourseSchema, CourseSubject } from './schemas/course-subject.schema';
import { Upload, UploadSchema } from './schemas/file.schema';
import { CourseDocService } from './services/course-doc.service';
import { UploadInterceptor } from './upload.interceptor';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CourseDoc.name,
        schema: CourseDocSchema,
      },
    ]),
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
        name: CourseSubject.name,
        schema: CourseSchema,
      },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [FilesController],
  providers: [CourseDocService, UploadInterceptor],
  exports: [CourseDocService],
})
export class FilesModule {}
