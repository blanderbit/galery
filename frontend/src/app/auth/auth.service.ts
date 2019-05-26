import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { AuthInterceptorService } from '../auth-interceptor.service';
import { Router } from '@angular/router';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStore } from '../models';
import { Logout, UpdateUserData, LoadUserSuccess } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: BehaviorSubject<any>;
  constructor(
    private http: HttpClient,
    private interceptor: AuthInterceptorService,
    private store: Store<AppStore>,
    private router: Router
  ) {
    this.user = new BehaviorSubject('');
  }

  login(data: any): Observable<any> {
    return of(data)
      .pipe(
        tap(this.interceptor.setToken),
        catchError(_ => of(null)),
      );
  }
  logout(): void {
    this.store.dispatch(new Logout());
    this.interceptor.clearToken();
    this.router.navigateByUrl('/user/login');
  }
  getMe(): Observable<any> {
    return this.http.get('users/me').pipe(tap(user => {
      this.user.next(user);
      if (user) {
        this.store.dispatch(new LoadUserSuccess(user));
      }
    }));
  }
}
