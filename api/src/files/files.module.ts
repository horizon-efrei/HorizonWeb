import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AttachmentsModule } from './attachments/attachments.module';
import { DocumentsModule } from './documents/documents.module';
import { FileUploadsModule } from './file-uploads/file-uploads.module';
import { ProfileImagesModule } from './profile-images/profile-images.module';

@Module({
  imports: [
    RouterModule.register([{
      path: 'files',
      children: [
        { path: 'attachments', module: AttachmentsModule },
        { path: 'uploads', module: FileUploadsModule },
        { path: 'documents', module: DocumentsModule },
        { path: 'profile-images', module: ProfileImagesModule },
      ],
    }]),
    AttachmentsModule,
    FileUploadsModule,
    DocumentsModule,
    ProfileImagesModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class FilesModule {}
