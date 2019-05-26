import { Token } from '../token.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { TokenModel } from 'src/models/token.model';

export class CreateTokenDto implements Partial<TokenModel> {
  @ApiModelProperty()
  @IsString()
  filePath: string;

  @ApiModelProperty()
  @IsString()
  title: string;

  @ApiModelProperty()
  @IsString()
  description: string;
}
