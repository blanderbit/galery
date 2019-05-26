import { User } from '../user.entity';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsMongoId,
  IsEmpty,
} from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto implements Partial<User> {
  @ApiModelProperty()
  @IsMongoId()
  @IsOptional()
  public id: string;

  @IsEmpty()
  public nonce?: number;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  public publicAddress: string;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  public username: string;
}
