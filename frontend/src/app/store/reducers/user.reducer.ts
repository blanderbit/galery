import { UserStore } from '../../models/user-store.model';
import { UserActionTypes } from '../constants';
import { UserActions } from '../actions/user.actions';

export const initialState: UserStore = {
  loading: false,
  error: null
};

export function userReducer(state = initialState, action: UserActions): UserStore {
  switch (action.type) {
    case UserActionTypes.LoadUser:
    case UserActionTypes.UpdateUserData:
      return { ...state, loading: true };

    case UserActionTypes.LoadUserSuccess:
    case UserActionTypes.LoadUserFailure:
      return { ...state, ...action.payload, loading: false };

    case UserActionTypes.Logout:
      return initialState;

    default:
      return state;
  }
}
