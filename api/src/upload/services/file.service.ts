import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from '../schemas/file.schema';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<File>,
  ) { }

  public async getFileByName(name: string): Promise<File | null> {
    return await this.fileModel.findOne({ fileName: { $regex: new RegExp(`^${name}$`, 'i') } });
  }

  public async validateFileByName(fileName: string): Promise<File> {
    const file = await this.getFileByName(fileName);
    if (!file)
      throw new NotFoundException('File not found');

    return file;
  }

  public async getFileById(id: string): Promise<File | null> {
    return await this.fileModel.findById(id);
  }

  public async validateFileById(id: string): Promise<File> {
    const file = await this.getFileById(id);
    if (!file)
      throw new NotFoundException('File not found');

    return file;
  }

  public async create(body: Partial<File>): Promise<File> {
    const file = await this.fileModel.create({
      ...body
    });
    return await file.save();
  }
}
