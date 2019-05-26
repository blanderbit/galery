import { EntityState } from '@ngrx/entity';
import { TokenModel } from './token.model';

export interface TokenStore extends EntityState<TokenModel> {
  // additional entities state properties
  selectedTokenId: null | number;
}
