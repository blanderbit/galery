import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthBody {
  @ApiModelProperty()
  @IsString()
  public signature!: string;

  @ApiModelProperty()
  @IsString()
  public publicAddress!: string;
}
