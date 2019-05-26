import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { from } from 'rxjs';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { User } from '../users/user.entity';
import { ObjectLiteral, ObjectID } from 'typeorm';
import { CreateGalleryDto } from './dtos/create-gallery.dto';
import { UpdateGalleryDto } from './dtos/update-gallery.dto';
import { GalleryService } from './gallery.service';

@ApiUseTags('gallery')
@Controller('gallery')
export class GalleryController {
  private withOwner = {
    $lookup: {
      from: 'users',
      localField: 'ownerAddress',
      foreignField: 'publicAddress',
      as: 'owner',
    },
  };

  constructor(private readonly galleryService: GalleryService) { }

  @Get()
  findAll() {
    return from(this.galleryService.findAllAggregate([this.withOwner]));
  }

  @Get('my-galleries')
  @UseGuards(AuthGuard('jwt'))
  myGallery(@AuthUser() authUser: User) {
    const where: ObjectLiteral[] = [
      {
        $match: {
          ownerAddress: authUser.publicAddress,
        },
      },
      this.withOwner,
    ];
    return from(this.galleryService.findAllAggregate(where));
  }

  @Get('check-owner/:galleryId')
  @UseGuards(AuthGuard('jwt'))
  checkOwner(
    @Param('galleryId') galleryId: string,
    @AuthUser() authUser: User,
  ) {
    return from(this.galleryService.checkOwner({ galleryId, authUser }));
  }

  @Get(':address')
  findOne(@Param('address') address: number) {
    const where: ObjectLiteral[] = [
      {
        $match: {
          address,
        },
      },
      this.withOwner,
    ];
    return from(this.galleryService.findAllAggregate(where));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createGalleryDto: CreateGalleryDto,
    @AuthUser() authUser: User,
  ) {
    return from(this.galleryService.create(createGalleryDto, authUser));
  }

  @Patch(':address')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('address') address: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
    @AuthUser() authUser: User,
  ) {
    return from(this.galleryService.patch(address, updateGalleryDto, authUser));
  }
}
