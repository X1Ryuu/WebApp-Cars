import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn, GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Inject, Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private oauthService: OAuthService, private router : Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.oauthService.hasValidAccessToken()) {
      const requiredRoles = route.data['roles'] as Array<string>;
      console.log(requiredRoles);
      if(requiredRoles.length==1 && this.authService.doesIncludeRole(requiredRoles[0])){
        /*console.log(this.authService.doesIncludeRole(requiredRoles[0]));*/
        console.log("Here you go sir")
        return true;
      }else{
        console.log("nuh-uh")
        return false;
      }


    } else {
      this.oauthService.initLoginFlow();
      return false;
    }

  }


}
