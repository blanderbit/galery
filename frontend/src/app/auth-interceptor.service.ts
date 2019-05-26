import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  authToken: string;
  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    @Inject(PLATFORM_ID) private platformId: {}
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken: string;
    if (isPlatformBrowser(this.platformId)) {
      authToken = this.authToken || sessionStorage.getItem('token');
    }
    if (authToken) {
      const cloned = req.clone({
        url: `${this.baseUrl}/${req.url}`,
        // headers: req.headers.set('Authorization', authToken),
        setHeaders: { Authorization: 'Bearer' + ' ' + authToken },
      });
      return next.handle(cloned);
    } else {
      const cloned = req.clone({ url: `${this.baseUrl}/${req.url}`, setHeaders: { Authorization: '' } });
      return next.handle(cloned);
    }
  }
  setToken(token: { accessToken: string }): void {
    if (token && token.accessToken) {
      this.authToken = token.accessToken;
      sessionStorage.setItem('token', this.authToken);
    }
  }
  clearToken() {
    this.authToken = null;
    sessionStorage.removeItem('token');
  }
}
