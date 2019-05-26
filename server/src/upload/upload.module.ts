import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/tmp',
      storage: diskStorage({
        // Destination storage path details
        destination: (
          req: Express.Request,
          file: Express.Multer.File,
          cb: any,
        ) => {
          const uploadPath = './uploads/tmp';
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        // File modification details
        filename: (
          req: Express.Request,
          file: Express.Multer.File,
          cb: any,
        ) => {
          // Calling the callback passing the random name generated with the original extension name
          cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
