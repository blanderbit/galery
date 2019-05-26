import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TokenActionTypes } from '../constants';
import { TokenModel } from '../../models';

export class LoadTokens implements Action {
  readonly type = TokenActionTypes.LoadTokens;

  constructor(public payload: { tokens: TokenModel[] }) { }
}

export class AddToken implements Action {
  readonly type = TokenActionTypes.AddToken;

  constructor(public payload: { token: TokenModel }) { }
}

export class UpsertToken implements Action {
  readonly type = TokenActionTypes.UpsertToken;

  constructor(public payload: { token: TokenModel }) { }
}

export class AddTokens implements Action {
  readonly type = TokenActionTypes.AddTokens;

  constructor(public payload: { tokens: TokenModel[] }) { }
}

export class UpsertTokens implements Action {
  readonly type = TokenActionTypes.UpsertTokens;

  constructor(public payload: { tokens: TokenModel[] }) { }
}

export class UpdateToken implements Action {
  readonly type = TokenActionTypes.UpdateToken;

  constructor(public payload: { token: Update<TokenModel> }) { }
}

export class UpdateTokens implements Action {
  readonly type = TokenActionTypes.UpdateTokens;

  constructor(public payload: { tokens: Update<TokenModel>[] }) { }
}

export class DeleteToken implements Action {
  readonly type = TokenActionTypes.DeleteToken;

  constructor(public payload: { id: string }) { }
}

export class DeleteTokens implements Action {
  readonly type = TokenActionTypes.DeleteTokens;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearTokens implements Action {
  readonly type = TokenActionTypes.ClearTokens;
}

export class GetTokens implements Action {
  readonly type = TokenActionTypes.GetTokens;
}
export class GetMyTokens implements Action {
  readonly type = TokenActionTypes.GetMyTokens;
}

export class LoadTokenSuccess implements Action {
  readonly type = TokenActionTypes.LoadTokenSuccess;
}

export class LoadTokenFailure implements Action {
  readonly type = TokenActionTypes.LoadTokenFailure;
  constructor(public payload: { error: any }) { }
}

export class GetTokenById implements Action {
  readonly type = TokenActionTypes.GetTokenById;
  constructor(public payload: { tokenId: string }) { }
}

export type TokenActions =
  | LoadTokens
  | AddToken
  | UpsertToken
  | AddTokens
  | UpsertTokens
  | UpdateToken
  | UpdateTokens
  | DeleteToken
  | DeleteTokens
  | ClearTokens
  | GetTokens
  | GetMyTokens
  | LoadTokenSuccess
  | GetTokenById
  | LoadTokenFailure;
