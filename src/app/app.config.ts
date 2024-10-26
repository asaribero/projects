import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { firebaseProviders } from './firebase.config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide:JWT_OPTIONS, useValue: JWT_OPTIONS},
    provideRouter(routes), 
    provideClientHydration(),
    firebaseProviders,
    JwtHelperService,
    {provide:HTTP_INTERCEPTORS, useClass: TokenInterceptorService,multi:true},
    importProvidersFrom(
      HttpClientModule
    )
  ]
};
