import { User } from '../user.entity';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto implements Partial<User> {
  @ApiModelProperty()
  @IsString()
  public publicAddress!: string;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  public username?: string;
}
