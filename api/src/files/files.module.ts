import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '../shared/modules/casl/casl-ability.factory';
import { Subject } from '../subjects/subject.entity';
import { DocSeries } from './entities/doc-series.entity';
import { FileUpload } from './entities/file-upload.entity';
import { StudyDoc } from './entities/study-doc.entity';
import { FilesController } from './files.controller';
import { FileUploadsService } from './services/file-uploads.service';
import { StudyDocsService } from './services/study-docs.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([DocSeries, FileUpload, StudyDoc, Subject]),
  ],
  controllers: [FilesController],
  providers: [CaslAbilityFactory, StudyDocsService, FileUploadsService],
  exports: [StudyDocsService],
})
export class FilesModule {}
