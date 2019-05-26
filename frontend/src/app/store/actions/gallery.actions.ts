import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Gallery } from '../../models/gallery.model';
import { GalleryActionTypes } from '../constants';

export class LoadGalleries implements Action {
  readonly type = GalleryActionTypes.LoadGalleries;

  constructor(public payload: { galleries: Gallery[] }) { }
}

export class AddGallery implements Action {
  readonly type = GalleryActionTypes.AddGallery;

  constructor(public payload: { gallery: Gallery }) { }
}

export class UpsertGallery implements Action {
  readonly type = GalleryActionTypes.UpsertGallery;

  constructor(public payload: { gallery: Gallery }) { }
}

export class AddGalleries implements Action {
  readonly type = GalleryActionTypes.AddGalleries;

  constructor(public payload: { galleries: Gallery[] }) { }
}

export class UpsertGalleries implements Action {
  readonly type = GalleryActionTypes.UpsertGalleries;

  constructor(public payload: { galleries: Gallery[] }) { }
}

export class UpdateGallery implements Action {
  readonly type = GalleryActionTypes.UpdateGallery;

  constructor(public payload: { gallery: Update<Gallery> }) { }
}

export class UpdateGalleries implements Action {
  readonly type = GalleryActionTypes.UpdateGalleries;

  constructor(public payload: { galleries: Update<Gallery>[] }) { }
}

export class DeleteGallery implements Action {
  readonly type = GalleryActionTypes.DeleteGallery;

  constructor(public payload: { id: string }) { }
}

export class DeleteGalleries implements Action {
  readonly type = GalleryActionTypes.DeleteGalleries;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearGalleries implements Action {
  readonly type = GalleryActionTypes.ClearGalleries;
}

export class GetGalleries implements Action {
  readonly type = GalleryActionTypes.GetGalleries;
}

export class GetMyGalleries implements Action {
  readonly type = GalleryActionTypes.GetMyGalleries;
}

export class GetGallery implements Action {
  readonly type = GalleryActionTypes.GetGallery;
}

export class LoadGallerySuccess implements Action {
  readonly type = GalleryActionTypes.LoadGallerySuccess;
}

export class GalleryFailure implements Action {
  readonly type = GalleryActionTypes.GalleryFailure;
  constructor(public payload: { error: string }) { }
}

export class SetGalleryPrice implements Action {
  readonly type = GalleryActionTypes.SetGalleryPrice;
  constructor(public payload: { gallery: Gallery }) { }
}

export class SetGalleryPriceSuccess implements Action {
  readonly type = GalleryActionTypes.SetGalleryPriceSuccess;
  constructor(public payload: { gallery: Gallery }) { }
}

export class BuyGallery implements Action {
  readonly type = GalleryActionTypes.BuyGallery;
  constructor(public payload: { gallery: Gallery }) { }
}

export class BuyGallerySuccess implements Action {
  readonly type = GalleryActionTypes.BuyGallerySuccess;
  constructor(public payload: { gallery: Gallery }) { }
}

export class CheckGalleryOwner implements Action {
  readonly type = GalleryActionTypes.CheckGalleryOwner;
  constructor(public payload: { gallery: Gallery }) { }
}

export type GalleryActions =
  | LoadGalleries
  | AddGallery
  | UpsertGallery
  | AddGalleries
  | UpsertGalleries
  | UpdateGallery
  | UpdateGalleries
  | DeleteGallery
  | DeleteGalleries
  | GetGalleries
  | GetGallery
  | GetMyGalleries
  | LoadGallerySuccess
  | GalleryFailure
  | SetGalleryPrice
  | SetGalleryPriceSuccess
  | BuyGallery
  | BuyGallerySuccess
  | CheckGalleryOwner
  | ClearGalleries;
