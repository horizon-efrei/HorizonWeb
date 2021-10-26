import { promises as fs } from 'fs';
import path from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Express } from 'express';
import { Model } from 'mongoose';
import { uploadConfig } from '../../config';
import type { FileType } from '../../shared/types/file-types.enum';
import type { User } from '../../users/user.schema';
import type { CreateFileUploadDto } from '../dto/create-file-upload.dto';
import { FileUpload } from '../schemas/file-upload.schema';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(FileUpload.name) private readonly fileUploadModel: Model<FileUpload>,
  ) {}

  public async getUploadByName(name: string): Promise<FileUpload | null> {
    return await this.fileUploadModel.findOne({ uploadName: { $regex: new RegExp(`^${name}$`, 'i') } });
  }

  public async validateUploadByName(uploadName: string): Promise<FileUpload> {
    const upload = await this.getUploadByName(uploadName);
    if (!upload)
      throw new NotFoundException('Upload not found');

    return upload;
  }

  public async getUploadById(id: string): Promise<FileUpload | null> {
    return await this.fileUploadModel.findById(id);
  }

  public async validateUploadById(id: string): Promise<FileUpload> {
    const upload = await this.getUploadById(id);
    if (!upload)
      throw new NotFoundException('Upload not found');

    return upload;
  }

  public async create(currentUser: User, body: CreateFileUploadDto,
    file: Express.Multer.File, fileType: FileType): Promise<FileUpload> {
    const fileDocument = await this.fileUploadModel.create({
      author: currentUser,
      ...body,
    });

    await fs.writeFile(
      path.join(uploadConfig.uploadPath, fileType, fileDocument._id.toString()),
      file.buffer,
    );

    return await fileDocument.save();
  }
}
