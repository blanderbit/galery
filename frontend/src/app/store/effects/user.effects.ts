import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap, switchMap, filter, tap, take } from 'rxjs/operators';

import { AppStore } from '../../models/app-store.model';
import { UserModel } from '../../models/user.model';
import * as UserActions from '../actions/user.actions';
import { UserActionTypes } from '../constants';

export type Action = UserActions.UserActions;

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppStore>
  ) { }

  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.LoadUser>(UserActionTypes.LoadUser),
    switchMap(() => this.store.select('user', 'id')),
    filter(e => !!e),
    take(1),
    mergeMap(id => this.http.get<UserModel>('users/' + id)),
    map(res => new UserActions.LoadUserSuccess(res)),
    catchError(this.onError)
  );

  @Effect()
  updateUserData$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.UpdateUserData>(UserActionTypes.UpdateUserData),
    mergeMap(({ payload }) => this.http.patch<UserModel>('users/' + payload.id, payload)),
    map(res => new UserActions.LoadUserSuccess(res)),
    catchError(this.onError)
  );

  onError(error: HttpErrorResponse, caught: any): Observable<Action> {
    this.store.dispatch(new UserActions.LoadUserFailure({ error: error.message }));
    return caught;
  }
}
