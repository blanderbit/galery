import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStoreUrl, TokenModel } from '../../models';
import { selectGalleryEntities } from './gallery.selectors';
import { selectTokenEntities, selectAllTokens } from './token.selectors';

export const selectRouterState =
  createFeatureSelector<RouterReducerState<RouterStoreUrl>>('router');

export const selectRouteParameters = createSelector(
  selectRouterState,
  router => router.state.params
);
export const selectRouteData = createSelector(
  selectRouterState,
  router => router.state.data
);
export const selectRouteQueryParams = createSelector(
  selectRouterState,
  router => router.state.queryParams
);

export const selectCurrentGalleryByRouter = createSelector(
  selectGalleryEntities,
  selectRouteParameters,
  (galleryEntities, route) => galleryEntities[route.galleryId]
);
export const selectCurrentGalleryTokens = createSelector(
  selectAllTokens,
  selectRouteParameters,
  (tokenEntities, route) => tokenEntities.filter(
    token => token.addressContract === route.galleryId
  )
);

export const selectCurrentTokenByRouter = createSelector(
  selectTokenEntities,
  selectRouteParameters,
  (tokenEntities, route) => tokenEntities[route.artworkId]
);
