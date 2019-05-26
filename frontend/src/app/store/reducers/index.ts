import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { userReducer } from './user.reducer';
import { AppStore } from '../../models/app-store.model';
import * as fromToken from './token.reducer';
import * as fromGallery from './gallery.reducer';
import { routerReducer } from '@ngrx/router-store';

export const reducers: ActionReducerMap<AppStore> = {
  user: userReducer,
  tokens: fromToken.reducer,
  galleries: fromGallery.reducer,
  router: routerReducer,
};


export const metaReducers: MetaReducer<AppStore>[] = !environment.production ? [] : [];
