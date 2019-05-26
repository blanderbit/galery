import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

import { TokenModel } from 'src/models/token.model';

export class UpdateTokenDto implements Partial<TokenModel> {
  @ApiModelProperty()
  @IsNumber()
  tokenId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  title?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  ownerAddress?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  addressContract?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  addressMarketContract?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  price?: number;
}
