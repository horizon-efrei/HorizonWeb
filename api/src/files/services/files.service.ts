import { promises as fs, constants as fsConst } from 'fs';
import path from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Express } from 'express';
import { Model } from 'mongoose';
import { uploadConfig } from '../../config';
import type { User } from '../../users/user.schema';
import type { CreateUploadDto } from '../dto/create-file.dto';
import { Upload } from '../schemas/file.schema';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(Upload.name) private readonly fileModel: Model<Upload>,
  ) {}

  public async getUploadByName(name: string): Promise<Upload | null> {
    return await this.fileModel.findOne({ uploadName: { $regex: new RegExp(`^${name}$`, 'i') } });
  }

  public async validateUploadByName(uploadName: string): Promise<Upload> {
    const upload = await this.getUploadByName(uploadName);
    if (!upload)
      throw new NotFoundException('Upload not found');

    return upload;
  }

  public async getUploadById(id: string): Promise<Upload | null> {
    return await this.fileModel.findById(id);
  }

  public async validateUploadById(id: string): Promise<Upload> {
    const upload = await this.getUploadById(id);
    if (!upload)
      throw new NotFoundException('Upload not found');

    return upload;
  }

  public async create(currentUser: User, body: CreateUploadDto, file: Express.Multer.File): Promise<Upload> {
    const fileDocument = await this.fileModel.create({
      author: currentUser,
      ...body,
    });
    console.log(body, fileDocument, fileDocument.id);

    const uploadFolder = path.join(uploadConfig.uploadPath, fileDocument.id as string);

    await fs.access(uploadFolder, fsConst.F_OK)
    .catch(async () => { await fs.mkdir(uploadFolder); });

    await fs.writeFile(
      path.join(uploadFolder, fileDocument.originalName),
      file.buffer,
    );

    return await fileDocument.save();
  }
}
