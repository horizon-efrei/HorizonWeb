import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject } from '../schemas/subject.schema';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>,
  ) { }

  public async getFileByName(name: string): Promise<Subject | null> {
    return await this.subjectModel.findOne({ fileName: { $regex: new RegExp(`^${name}$`, 'i') } });
  }

  public async validateFileByName(fileName: string): Promise<Subject> {
    const subject = await this.getFileByName(fileName);
    if (!subject)
      throw new NotFoundException('Subject not found');

    return subject;
  }

  public async getFileById(id: string): Promise<Subject | null> {
    return await this.subjectModel.findById(id);
  }

  public async validateFileById(id: string): Promise<Subject> {
    const subject = await this.getFileById(id);
    if (!subject)
      throw new NotFoundException('Subject not found');

    return subject;
  }

  public async create(body: Partial<Subject>): Promise<Subject> {
    const subject = await this.subjectModel.create({
      ...body
    });
    return await subject.save();
  }
}
