import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Gallery } from '../../models/gallery.model';
import { GalleryActions } from '../actions/gallery.actions';
import { GalleryActionTypes } from '../constants';
import { GalleryStore } from '../../models/gallery-store.models';

export const adapter: EntityAdapter<Gallery> = createEntityAdapter<Gallery>({
  selectId: (gallery: Gallery) => gallery.address
});

export const initialState: GalleryStore = adapter.getInitialState({
  selectedGalleryId: null,
  error: null
});

export function reducer(
  state = initialState,
  action: GalleryActions
): GalleryStore {
  switch (action.type) {
    case GalleryActionTypes.AddGallery: {
      return adapter.addOne(action.payload.gallery, state);
    }

    case GalleryActionTypes.UpsertGallery: {
      return adapter.upsertOne(action.payload.gallery, state);
    }

    case GalleryActionTypes.AddGalleries: {
      return adapter.addMany(action.payload.galleries, state);
    }

    case GalleryActionTypes.UpsertGalleries: {
      return adapter.upsertMany(action.payload.galleries, state);
    }

    case GalleryActionTypes.UpdateGallery: {
      return adapter.updateOne(action.payload.gallery, state);
    }

    case GalleryActionTypes.UpdateGalleries: {
      return adapter.updateMany(action.payload.galleries, state);
    }

    case GalleryActionTypes.DeleteGallery: {
      return adapter.removeOne(action.payload.id, state);
    }

    case GalleryActionTypes.DeleteGalleries: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case GalleryActionTypes.LoadGalleries: {
      return adapter.addAll(action.payload.galleries, state);
    }

    case GalleryActionTypes.ClearGalleries: {
      return adapter.removeAll(state);
    }

    case GalleryActionTypes.GalleryFailure: {
      return {
        ...state,
        error: action.payload.error
      };
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
