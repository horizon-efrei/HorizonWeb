import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload } from '../schemas/upload.schema'

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Upload.name) private readonly uploadModel: Model<Upload>,
  ) { }

  public async getUploadByName(name: string): Promise<Upload | null> {
    return await this.uploadModel.findOne({ uploadName: { $regex: new RegExp(`^${name}$`, 'i') } });
  }

  public async validateUploadByName(uploadName: string): Promise<Upload> {
    const Upload = await this.getUploadByName(uploadName);
    if (!Upload)
      throw new NotFoundException('Upload not found');

    return Upload;
  }

  public async getUploadById(id: string): Promise<Upload | null> {
    return await this.uploadModel.findById(id);
  }

  public async validateUploadById(id: string): Promise<Upload> {
    const Upload = await this.getUploadById(id);
    if (!Upload)
      throw new NotFoundException('Upload not found');

    return Upload;
  }

  public async create(body: Partial<Upload>): Promise<Upload> {
    const Upload = await this.uploadModel.create({
      ...body
    });
    return await Upload.save();
  }
}
