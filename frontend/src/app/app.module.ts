import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { MainComponent } from './layouts/main/main.component';
import { NotAuthorizedComponent } from './layouts/not-authorized/not-authorized.component';
import { SharedModule } from './shared/shared.module';
import { AppEffects, UserEffects } from './store/effects';
import { GalleryEffects } from './store/effects/gallery.effects';
import { TokenEffects } from './store/effects/token.effects';
import { metaReducers, reducers } from './store/reducers';
import { CustomSerializer, SellSmartContractProvider, SmartContractProvider, WEB3_PROVIDERS, WINDOW_PROVIDERS } from './store/services';

@NgModule({
  declarations: [AppComponent, NotAuthorizedComponent, MainComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
      }
    }),
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([
      AppEffects,
      UserEffects,
      TokenEffects,
      GalleryEffects,
    ]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
  ],
  providers: [
    WINDOW_PROVIDERS,
    WEB3_PROVIDERS,
    SmartContractProvider,
    SellSmartContractProvider,
    { provide: 'BASE_API_URL', useValue: environment.apiUrl, multi: true },
    { provide: 'BASE_STORAGE_URL', useValue: environment.storage, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function jwtTokenGetter() {
  return sessionStorage.getItem('token');
}
