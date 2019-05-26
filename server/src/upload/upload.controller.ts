import {
  Controller,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiUseTags('upload')
@Controller('upload')
export class UploadController {
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @AuthUser() authUser: User,
    @UploadedFile() file: Express.Multer.File,
  ): Observable<any> {
    return of({ path: file.path });
  }
}
