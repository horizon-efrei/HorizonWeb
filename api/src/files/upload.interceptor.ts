/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-promise-executor-return */
import { promises as fs, constants as fsConst } from 'fs';
import path from 'path';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import {
  mixin,

  PayloadTooLargeException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { transformException } from '@nestjs/platform-express/multer/multer/multer.utils';
import * as mimeDb from 'mime-db';
import { Model } from 'mongoose';
import multer, { diskStorage } from 'multer';
import type { Observable } from 'rxjs';
import { uploadConfig } from '../config';
import type { User } from '../users/user.schema';
import { Upload } from './schemas/file.schema';

type MulterInstance = any;
class MixinInterceptor implements NestInterceptor {
  protected multer: MulterInstance;

  constructor(
    @InjectModel(Upload.name) private readonly uploadModel: Model<Upload>,
  ) {
    this.multer = (multer as any)({
      storage: diskStorage({
          destination: uploadConfig.uploadPath,
          filename: async (req, file, cb) => {
            req.user = { _id: (req.user as User)._id };
            const { body, user } = req;

            let error = null;
            let fileDocument = null;
            const { maxSize } = uploadConfig;
            if (file.size > maxSize) {
              error = new PayloadTooLargeException(`File too large, max ${maxSize} bytes.`);
            } else {
              fileDocument = await this.uploadModel.create({
                author: user,
                originalName: body.filename,
                type: file.mimetype,
                lastModified: body.lastModified,
              });
              const uploadPath = path.join(uploadConfig.uploadPath, fileDocument.id as string);
              await fs.access(uploadPath, fsConst.F_OK)
              .catch(async () => { await fs.mkdir(uploadPath); });

              await fileDocument.save();
              body.fileDocument = fileDocument;
            }
            cb(error, error ? '' : path.join(fileDocument?.id as string, (body.filename as string) ?? `${Date.now()}-${Math.round(Math.random() * 1e9)}.${mimeDb[file.mimetype]?.extensions?.[0] ?? 'unknown'}`));
          },
      }),
    });
  }

  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();

    await new Promise<void>((resolve, reject) =>
      this.multer.single('file')(
        ctx.getRequest(),
        ctx.getResponse(),
        (err: Error | undefined) => {
          if (err) {
            const error = transformException(err);
            reject(error);
            return;
          }
          resolve();
        },
      ));

    return next.handle();
  }
}

export const UploadInterceptor = mixin(MixinInterceptor);
