import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromGallery from '../reducers/gallery.reducer';
import { GalleryStore } from '../../models';

export const selectGalleryState = createFeatureSelector<GalleryStore>('galleries');

export const getSelectedGalleryId = (state: GalleryStore) => state.selectedGalleryId;

export const selectGalleryIds = createSelector(
  selectGalleryState,
  fromGallery.selectIds
);
export const selectGalleryEntities = createSelector(
  selectGalleryState,
  fromGallery.selectEntities
);
export const selectAllGalleries = createSelector(
  selectGalleryState,
  fromGallery.selectAll
);
export const selectGalleryTotal = createSelector(
  selectGalleryState,
  fromGallery.selectTotal
);
export const selectCurrentGalleryId = createSelector(
  selectGalleryState,
  getSelectedGalleryId
);

export const selectCurrentGallery = createSelector(
  selectGalleryEntities,
  selectCurrentGalleryId,
  (galleryEntities, tokenId) => galleryEntities[tokenId]
);


