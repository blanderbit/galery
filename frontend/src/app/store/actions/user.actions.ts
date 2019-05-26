import { Action } from '@ngrx/store';
import { UserActionTypes } from '../constants';
import { UserModel } from '../../models/user.model';

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;
}

export class Logout implements Action {
  readonly type = UserActionTypes.Logout;
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LoadUserSuccess;
  constructor(public payload: Partial<UserModel>) { }
}

export class LoadUserFailure implements Action {
  readonly type = UserActionTypes.LoadUserFailure;
  constructor(public payload: { error: any }) { }
}

export class UpdateUserData implements Action {
  readonly type = UserActionTypes.UpdateUserData;
  constructor(public payload: Partial<UserModel>) { }
}

export type UserActions = LoadUser | LoadUserSuccess | LoadUserFailure | UpdateUserData | Logout;

