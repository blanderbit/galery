import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { UserStore } from '../../models';

export const selectUserState = createFeatureSelector<UserStore>('user');

export const getSelectedUserId = (state: UserStore) => state.id;

export const selectUserPublicAddress = createSelector(
  selectUserState,
  (state) => state.publicAddress
);
