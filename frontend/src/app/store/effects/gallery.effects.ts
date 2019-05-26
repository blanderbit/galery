import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, pluck, switchMap, take, toArray } from 'rxjs/operators';

import { AppStore, Gallery } from '../../models';
import {
  GalleryActions, GalleryFailure,
  LoadGalleries, UpsertGalleries,
  UpsertGallery, CheckGalleryOwner
} from '../actions/gallery.actions';
import { GalleryActionTypes } from '../constants';
import { selectRouteParameters } from '../selectors';
import { MetaMaskService } from '../services';

@Injectable()
export class GalleryEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppStore>,
    private metaMaskService: MetaMaskService,
    @Inject('BASE_STORAGE_URL') private storageUrl: string,
  ) { }

  @Effect()
  setGalleryPrice$: Observable<GalleryActions> = this.actions$.pipe(
    ofType<GalleryActions>(GalleryActionTypes.SetGalleryPrice),
    pluck<GalleryActions, Gallery>('payload', 'gallery'),
    exhaustMap(gallery => this.metaMaskService.setContractPrice(gallery).pipe(
      mergeMap(() => from([
        new UpsertGallery({ gallery }),
        new CheckGalleryOwner({ gallery }),
      ])),
      catchError(this.onError),
    )),
  );

  @Effect()
  checkGalleryOwner$: Observable<GalleryActions> = this.actions$.pipe(
    ofType<GalleryActions>(GalleryActionTypes.CheckGalleryOwner),
    pluck<GalleryActions, Gallery>('payload', 'gallery'),
    mergeMap(({ id }) => this.http.get<Gallery>('gallery/check-owner/' + id).pipe(
      map(g => ({ ...g, image: this.storageUrl + '/' + g.image })),
      mergeMap(gallery => from([
        new UpsertGallery({ gallery })
      ])),
      catchError(this.onError)
    )),
  );

  @Effect()
  buyGallery$: Observable<GalleryActions> = this.actions$.pipe(
    ofType<GalleryActions>(GalleryActionTypes.BuyGallery),
    pluck<GalleryActions, Gallery>('payload', 'gallery'),
    exhaustMap(gallery => this.metaMaskService.buyGallery(gallery).pipe(
      map(() => new CheckGalleryOwner({ gallery })),
      catchError(this.onError)
    )),
  );

  @Effect()
  getAllGallery$: Observable<GalleryActions> = this.actions$.pipe(
    ofType<GalleryActions>(GalleryActionTypes.GetGalleries),
    switchMap(() => this.http.get<Gallery[]>('gallery').pipe(
      take(1),
      switchMap(g => g),
      map(g => ({ ...g, image: this.storageUrl + '/' + g.image })),
      toArray(),
      map(galleries => new LoadGalleries({ galleries })),
      catchError(this.onError)
    )),
  );

  @Effect()
  getAllMyGallery$: Observable<GalleryActions> = this.actions$.pipe(
    ofType<GalleryActions>(GalleryActionTypes.GetMyGalleries),
    switchMap(() => this.http.get<Gallery[]>('gallery/my-galleries').pipe(
      take(1),
      switchMap(g => g),
      map(g => ({ ...g, image: this.storageUrl + '/' + g.image })),
      toArray(),
      map(galleries => new LoadGalleries({ galleries })),
      catchError(this.onError)
    )),
  );

  @Effect()
  getOneGallery$: Observable<GalleryActions> = this.actions$.pipe(
    ofType<GalleryActions>(GalleryActionTypes.GetGallery),
    switchMap(() => this.store.pipe(select(selectRouteParameters))),
    switchMap(({ galleryId }) => this.http.get<[Gallery]>('gallery/' + galleryId).pipe(
      take(1),
      switchMap(g => g),
      map(g => ({ ...g, image: this.storageUrl + '/' + g.image })),
      toArray(),
      map(galleries => new UpsertGalleries({ galleries })),
      catchError(this.onError)
    )),
  );

  onError(error: HttpErrorResponse, caught): Observable<GalleryActions> {
    // this.store.dispatch(new GalleryFailure({ error: error.message }));
    return of(new GalleryFailure({ error: error.message }));
    // return caught;
  }
}
