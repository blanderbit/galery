import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TokenStore } from '../../models/token-store.model';
import { TokenModel } from '../../models';
import { TokenActions } from '../actions';
import { TokenActionTypes } from '../constants';

export const adapter: EntityAdapter<TokenModel> = createEntityAdapter<TokenModel>();

export const initialState: TokenStore = adapter.getInitialState({
  selectedTokenId: null
});

export function reducer(
  state = initialState,
  action: TokenActions
): TokenStore {
  switch (action.type) {
    case TokenActionTypes.AddToken: {
      return adapter.addOne(action.payload.token, state);
    }

    case TokenActionTypes.UpsertToken: {
      return adapter.upsertOne(action.payload.token, state);
    }

    case TokenActionTypes.AddTokens: {
      return adapter.addMany(action.payload.tokens, state);
    }

    case TokenActionTypes.UpsertTokens: {
      return adapter.upsertMany(action.payload.tokens, state);
    }

    case TokenActionTypes.UpdateToken: {
      return adapter.updateOne(action.payload.token, state);
    }

    case TokenActionTypes.UpdateTokens: {
      return adapter.updateMany(action.payload.tokens, state);
    }

    case TokenActionTypes.DeleteToken: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TokenActionTypes.DeleteTokens: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case TokenActionTypes.LoadTokens: {
      return adapter.addAll(action.payload.tokens, state);
    }

    case TokenActionTypes.ClearTokens: {
      return adapter.removeAll({ ...state, selectedTokenId: null});
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
