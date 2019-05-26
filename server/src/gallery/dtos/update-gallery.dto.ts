import { Entity, ObjectIdColumn, ObjectID, Column, Index } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Gallery } from '../gallery.entity';
import { IsString, IsMongoId, IsOptional } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateGalleryDto implements Partial<Gallery> {
  @ApiModelProperty()
  @IsMongoId()
  id: ObjectID;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  title: string;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  image: string;
}
