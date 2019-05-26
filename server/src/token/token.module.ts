import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    MulterModule.register({
      dest: './uploads/tokens',
      storage: diskStorage({
        // Destination storage path details
        destination: (
          req: Express.Request,
          file: Express.Multer.File,
          cb: any,
        ) => {
          const uploadPath = './uploads/tokens';
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
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
