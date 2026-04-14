import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app-routing.module';
import {HTTP_INTERCEPTORS, provideHttpClient} from '@angular/common/http';
import {AuthConfig,OAuthService, provideOAuthClient} from 'angular-oauth2-oidc';
import {AuthInterceptor} from './auth/auth.interceptor';


export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:9090/realms/Farco',
  tokenEndpoint: 'http://localhost:9090/realms/Farco/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  logoutUrl: 'http://localhost:9090/realms/Farco/protocol/openid-connect/logout',
  postLogoutRedirectUri: window.location.origin,
  clientId: 'angular-app',
  responseType: 'code',
  scope: 'openid profile',

}


function initializeOAuth(oauth: OAuthService): Promise<void>{
  return new Promise((resolve)=> {
    oauth.configure(authCodeFlowConfig);
    oauth.setupAutomaticSilentRefresh();
    oauth.loadDiscoveryDocumentAndTryLogin().then(() => {
      resolve();
      //console.log("Token: ", oauth.getAccessToken());
    }).catch(err => {
      console.error('Error during login:', err);
    });

  });
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {initializeOAuth(oauthService);
        }
      },
      multi: true,
      deps: [OAuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
