// Import { promises as fs } from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { User } from '../../users/user.schema';
import type { CreateCourseDocDto } from '../dto/create-course-doc.dto';
import { CourseDoc } from '../schemas/course-doc.schema';
import { Upload } from '../schemas/file.schema';

@Injectable()
export class CourseDocService {
  constructor(
    @InjectModel(CourseDoc.name) private readonly uploadModel: Model<CourseDoc>,
    @InjectModel(Upload.name) private readonly fileModel: Model<Upload>,
  ) {}

  public async getUploadByName(name: string): Promise<CourseDoc | null> {
    return await this.uploadModel.findOne({ uploadName: { $regex: new RegExp(`^${name}$`, 'i') } });
  }

  public async validateUploadByName(uploadName: string): Promise<CourseDoc> {
    const upload = await this.getUploadByName(uploadName);
    if (!upload)
      throw new NotFoundException('Upload not found');

    return upload;
  }

  public async getUploadById(id: string): Promise<CourseDoc | null> {
    return await this.uploadModel.findById(id);
  }

  public async validateUploadById(id: string): Promise<CourseDoc> {
    const upload = await this.getUploadById(id);
    if (!upload)
      throw new NotFoundException('Upload not found');

    return upload;
  }

  public async create(currentUser: User, body: CreateCourseDocDto): Promise<CourseDoc> {
    const upload = await this.uploadModel.create({
      file: body.fileDocument._id,
      author: currentUser,
      ...body,
    });

    return await upload.save();
  }
}
