import { UserStore } from './user-store.model';
import { TokenStore } from './token-store.model';
import { GalleryStore } from './gallery-store.models';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStoreUrl } from './router-store.model';

export interface AppStore {
  user: UserStore;
  tokens: TokenStore;
  galleries: GalleryStore;
  router: RouterReducerState<RouterStoreUrl>;
}
