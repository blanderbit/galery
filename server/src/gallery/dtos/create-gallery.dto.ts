import { Entity, ObjectIdColumn, ObjectID, Column, Index } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Gallery } from '../gallery.entity';
import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateGalleryDto implements Partial<Gallery> {
  @ApiModelProperty()
  @IsString()
  title: string;

  @ApiModelProperty()
  @IsString()
  description: string;

  @ApiModelProperty()
  @IsString()
  image: string;

  @ApiModelProperty()
  @IsString()
  address: string;
}
