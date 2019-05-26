import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Observable, from } from 'rxjs';
import { Token } from './token.entity';
import { ObjectLiteral, ObjectID } from 'typeorm';
import { CreateTokenDto } from './dtos/create-token.dtos';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { UpdateTokenDto } from './dtos/update-token.dtos';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiUseTags('tokens')
@Controller('tokens')
export class TokenController {
  private withOwner = {
    $lookup: {
      from: 'users',
      localField: 'ownerAddress',
      foreignField: 'publicAddress',
      as: 'owner',
    },
  };

  constructor(private readonly tokenService: TokenService) {}

  @Get()
  findAll(): Observable<Token[]> {
    return from(this.tokenService.findAllAggregate([this.withOwner]));
  }
  @Get('my-artworks')
  @UseGuards(AuthGuard('jwt'))
  myGallery(@AuthUser() authUser: User): Observable<Token[]> {
    const where: ObjectLiteral[] = [
      {
        $match: {
          ownerAddress: authUser.publicAddress,
        },
      },
      this.withOwner,
    ];
    return from(this.tokenService.findAllAggregate(where));
  }

  @Get('check-owner/:tokenId')
  @UseGuards(AuthGuard('jwt'))
  checkOwner(@Param('tokenId') tokenId: string, @AuthUser() authUser: User) {
    return from(this.tokenService.checkOwner({ tokenId, authUser }));
  }

  @Get(':tokenId')
  findOne(@Param('tokenId') tokenId: number): Observable<Token> {
    return from(this.tokenService.findOne(tokenId));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('artwork'))
  create(
    @Body() createTokenDto: CreateTokenDto,
    @AuthUser() authUser: User,
  ): Observable<Token> {
    return from(this.tokenService.create(createTokenDto, authUser));
  }

  @Patch(':tokenId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  patch(
    @Param('tokenId') tokenId: string,
    @Body() updateTokenDto: UpdateTokenDto,
    @AuthUser() authUser: User,
  ): Observable<Token> {
    return from(this.tokenService.patch(tokenId, updateTokenDto, authUser));
  }
}
