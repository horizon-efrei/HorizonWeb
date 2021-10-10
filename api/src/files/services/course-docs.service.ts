import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { CustomPaginateResult, labelize } from 'src/shared/pagination';
import { User } from '../../users/user.schema';
import { CreateCourseDocDto } from '../dto/create-course-doc.dto';
import { CourseDoc } from '../schemas/course-doc.schema';
import { Upload } from '../schemas/file.schema';

@Injectable()
export class CourseDocsService {
  constructor(
    @InjectModel(CourseDoc.name) private readonly courseDocModel: PaginateModel<CourseDoc>,
    @InjectModel(Upload.name) private readonly uploadModel: Model<Upload>,
  ) {}

  public async getUploadByName(name: string): Promise<CourseDoc | null> {
    return await this.courseDocModel.findOne({ courseDocModel: { $regex: new RegExp(`^${name}$`, 'i') } });
  }

  public async validateUploadByName(uploadName: string): Promise<CourseDoc> {
    const upload = await this.getUploadByName(uploadName);
    if (!upload)
      throw new NotFoundException('Upload not found');

    return upload;
  }

  public async getUploadById(id: string): Promise<CourseDoc | null> {
    return await this.courseDocModel.findById(id);
  }

  public async validateUploadById(id: string): Promise<CourseDoc> {
    const upload = await this.getUploadById(id);
    if (!upload)
      throw new NotFoundException('Upload not found');

    return upload;
  }

  public async create(currentUser: User, @Body() body: CreateCourseDocDto,
    fileDocument: Upload): Promise<CourseDoc> {
    const upload = await this.courseDocModel.create({
      file: fileDocument,
      ...(body),
    });

    return await upload.save();
  }

  public async findAll(
    paginationOptions?: { page: number; itemsPerPage: number },
  ): Promise<CustomPaginateResult<CourseDoc> | CourseDoc[]> {
    if (paginationOptions) {
      return labelize(await this.courseDocModel.paginate({}, {
        page: paginationOptions.page,
        limit: paginationOptions.itemsPerPage,
      }));
    }
    return await this.courseDocModel.find();
  }
}
