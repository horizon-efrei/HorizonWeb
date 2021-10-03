import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/user.schema';
//import { UserInterceptor } from '../shared/interceptors/user.interceptor';
import type { Upload } from './schemas/upload.schema';
import { UploadService } from './services/upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'upload', version: '1' })
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
  /*public async createUpload(@CurrentUser() user: User, @Body() createUploadDto: CreateUploadDto) {

  }*/

  /*@UseInterceptors(UserInterceptor)
  @Get(':username')
  public async findOne(@Param('username') username: string): Promise<Upload> {
    return await this.userService.validateUserByName(username);
  }*/
}