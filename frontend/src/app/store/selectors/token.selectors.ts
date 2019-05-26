import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromTokens from '../reducers/token.reducer';
import { TokenStore } from '../../models';

export const selectTokenState = createFeatureSelector<TokenStore>('tokens');

export const getSelectedTokenId = (state: TokenStore) => state.selectedTokenId;

export const selectTokenIds = createSelector(
  selectTokenState,
  fromTokens.selectIds
);
export const selectTokenEntities = createSelector(
  selectTokenState,
  fromTokens.selectEntities
);
export const selectAllTokens = createSelector(
  selectTokenState,
  fromTokens.selectAll
);
export const selectTokenTotal = createSelector(
  selectTokenState,
  fromTokens.selectTotal
);
export const selectCurrentTokenId = createSelector(
  selectTokenState,
  getSelectedTokenId
);

export const selectCurrentToken = createSelector(
  selectTokenEntities,
  selectCurrentTokenId,
  (userEntities, tokenId) => userEntities[tokenId]
);
