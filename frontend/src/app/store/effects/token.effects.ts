import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, take, toArray, pluck } from 'rxjs/operators';
import { AppStore, TokenModel } from '../../models';
import { LoadTokenFailure, LoadTokens, TokenActions, UpsertToken } from '../actions';
import { TokenActionTypes } from '../constants';

@Injectable()
export class TokenEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppStore>,
    @Inject('BASE_STORAGE_URL') private storageUrl: string,
  ) { }

  @Effect()
  getAllToken$: Observable<TokenActions> = this.actions$.pipe(
    ofType<TokenActions>(TokenActionTypes.GetTokens),
    switchMap(() => this.http.get<TokenModel[]>('tokens').pipe(
      take(1),
      switchMap(artWork => artWork),
      map(artWork => ({ ...artWork, filePath: this.storageUrl + '/' + artWork.filePath })),
      toArray(),
    )),
    map(tokens => new LoadTokens({ tokens })),
    catchError(this.onError)
  );

  @Effect()
  getMyTokens$: Observable<TokenActions> = this.actions$.pipe(
    ofType<TokenActions>(TokenActionTypes.GetMyTokens),
    switchMap(() => this.http.get<TokenModel[]>('tokens/my-artworks').pipe(
      take(1),
      switchMap(artWork => artWork),
      map(artWork => ({ ...artWork, filePath: this.storageUrl + '/' + artWork.filePath })),
      toArray(),
    )),
    map(tokens => new LoadTokens({ tokens })),
    catchError(this.onError)
  );

  @Effect()
  getTokensById$: Observable<TokenActions> = this.actions$.pipe(
    ofType<TokenActions>(TokenActionTypes.GetTokenById),
    pluck<TokenActions, string>('payload', 'tokenId'),
    switchMap(tokenId => this.http.get<TokenModel>('tokens/' + tokenId).pipe(
      map(artWork => ({ ...artWork, filePath: this.storageUrl + '/' + artWork.filePath })),
    )),
    map(token => new UpsertToken({ token })),
    catchError(this.onError)
  );

  onError(error: HttpErrorResponse, caught: any): Observable<TokenActions> {
    this.store.dispatch(new LoadTokenFailure({ error: error.message }));
    return caught;
  }

}
