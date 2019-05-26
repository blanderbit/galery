import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { map, catchError } from 'rxjs/operators';
import { UserModel } from './models/user.model';
import { AppStore } from './models';
import { Store } from '@ngrx/store';
import { UpdateUserData } from './store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.getMe().pipe(
      map<UserModel & { error: 'Unauthorized' }, boolean | UrlTree>(this.activateHandler),
      catchError(this.errorHandler.bind(this)),
    );
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.getMe().pipe(
      map<UserModel & { error: 'Unauthorized' }, boolean | UrlTree>(this.activateHandler),
      catchError(this.errorHandler.bind(this)),
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.getMe().pipe(
      map(({ error, id }: UserModel & { error: 'Unauthorized' }) => {
        if (!error && id) {
          return true;
        } else {
          this.router.navigate(['login'], { queryParams: { returnUrl: route.path } });
          return false;
        }
      }),
      catchError(_ => {
        this.router.navigate(['login'], { queryParams: { returnUrl: route.path } });
        return of(false);
      }),
    );
  }

  activateHandler({ error, id }: UserModel & { error: 'Unauthorized' }): boolean | UrlTree {
    return !error && id ? true : this.router.parseUrl('/auth/login');
  }

  errorHandler(err) {
    return of(this.router.parseUrl('/auth/login'));
  }
}
