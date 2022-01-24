import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type { Express } from 'express';
import { BadgesService } from '../../badges/badges.service';
import { BaseRepository } from '../../shared/lib/repositories/base.repository';
import { FileKind } from '../../shared/lib/types/file-kind.enum';
import { pointsValue } from '../../users/points.config';
import type { User } from '../../users/user.entity';
import { FilePersistanceService } from './file-persistance.service';
import { FileUpload } from './file-upload.entity';

@Injectable()
export class FileUploadsService {
  constructor(
    @InjectRepository(FileUpload) private readonly fileUploadRepository: BaseRepository<FileUpload>,
    private readonly filePersistanceService: FilePersistanceService,
    private readonly badgeService: BadgesService,
  ) {}

  public async findOne(fileUploadId: string): Promise<FileUpload> {
    // TODO: Maybe the user won't have access to this file. There can be some restrictions
    // (i.e. "sensitive"/"removed" files)
    return await this.fileUploadRepository.findOneOrFail({ fileUploadId }, { populate: ['user'] });
  }

  public async create(
    user: User,
    file: Express.Multer.File,
    fileKind: FileKind,
    fileLastModifiedAt = new Date(),
  ): Promise<FileUpload> {
    if (fileKind === FileKind.StudyDoc || fileKind === FileKind.InfoDoc) {
      user.points += pointsValue.upload;
      await this.badgeService.flushCheckAndUnlock(user, 'nbUploads');
    }


    const fileDocument = new FileUpload({
      user,
      name: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      fileKind,
      fileLastModifiedAt,
      url: '',
    });

    await this.fileUploadRepository.persistAndFlush(fileDocument);
    const infos = await this.filePersistanceService.upload(file, {
      path: fileDocument.getPath(),
      key: fileDocument.fileUploadId,
      kind: fileKind,
    });

    fileDocument.url = infos.url;

    return fileDocument;
  }
}
