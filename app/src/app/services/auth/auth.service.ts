import { Injectable, OnDestroy } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription, filter } from 'rxjs';

@Injectable({
  providedIn: 'root', // Make the service available application-wide
})
export class AuthService implements OnDestroy {
  isAdmin: boolean = false;
  helper: JwtHelperService;
  roles: string[] = [];
  isAble: boolean = false;
  private oauthSubscription: Subscription = new Subscription();

  constructor(private oauthService: OAuthService) {
    this.helper = new JwtHelperService();
  }

  initialize(): void {
    // Subscribe to OAuth events (e.g., token received or expired)
    this.oauthSubscription = this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received' || e.type === 'token_expires'))
      .subscribe(() => {
        this.checkRoles(); // Refresh roles after login or token refresh
        this.isAble = this.isAdmin && this.oauthService.hasValidAccessToken(); // Check if the token is valid
      });

    // Initial role check
    this.checkRoles();
/*    console.log("isAdmin: ", this.isAdmin)
    console.log("roles: ",this.roles)*/
  }

  ngOnDestroy(): void {
    if (this.oauthSubscription) {
      this.oauthSubscription.unsubscribe();
    }
  }

  checkRoles(): void {
    const token = this.oauthService.getAccessToken(); // Get the token
    if (token) {
      // Decode the JWT token
      const decodedToken = this.helper.decodeToken(token);

      // Extract roles from the token (adjust based on your token structure)
      const roles: string[] = decodedToken?.['resource_access']?.['angular-app']?.roles || [];

      // Set the admin flag based on roles
      this.isAdmin = roles.includes('admin');
      this.roles = roles; // Store roles in an array

      // Update the ability status
      this.isAble = this.isAdmin && this.oauthService.hasValidAccessToken();
    }
  }
  public getRoles(){
    return this.roles;
  }

  public doesIncludeRole(role: string): boolean {
    return this.roles.includes(role);
  }

  showRoles(): void {
    console.log('Roles:', this.roles);
    console.log('Is admin:', this.isAdmin);
    console.log('Is valid token:', this.oauthService.hasValidAccessToken());
    console.log('Is able:', this.isAble);
  }

  login(): void {
    this.oauthService.initLoginFlow(); // Start the login flow
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        this.checkRoles(); // Refresh roles after login
      });

  }

  logout(): void {
    this.oauthService.logOut();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

}
