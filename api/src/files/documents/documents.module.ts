import { MikroOrmModule } from '@mikro-orm/nestjs';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '../../shared/modules/casl/casl-ability.factory';
import { Subject } from '../../subjects/subject.entity';
import { DocSeries } from '../doc-series/doc-series.entity';
import { FileUploadsModule } from '../file-uploads/file-uploads.module';
import { DocumentSearchService } from './document-search.service';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { Document } from './entities/document.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([Document, Subject, DocSeries]),
    FileUploadsModule,
  ],
  controllers: [DocumentsController],
  providers: [CaslAbilityFactory, DocumentsService, DocumentSearchService],
  exports: [DocumentsService],
})
export class DocumentsModule implements OnModuleInit {
  constructor(
    private readonly studyDocSearchService: DocumentSearchService,
  ) {}

  public async onModuleInit(): Promise<void> {
    await this.studyDocSearchService.init();
  }
}
