import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { UploadModule } from './upload/upload.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    TokenModule,
    UploadModule,
    GalleryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
