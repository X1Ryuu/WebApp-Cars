/*
import { OAuthService } from 'angular-oauth2-oidc';
import jwt_decode from 'jwt-decode';

export class decoder {

  //constructor(private oauthService: OAuthService) {}

  /!*getRoles(): string[] {
    const accessToken = this.oauthService.getAccessToken();

    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);

      // Odczytanie ról z realm_access (role przypisane na poziomie Realm)
      const roles = decodedToken.realm_access?.roles || [];
      console.log('Realm Roles:', roles);

      // Odczytanie ról z resource_access (role przypisane na poziomie klienta)
      const clientRoles = decodedToken.resource_access?.['your-client-id']?.roles || [];
      console.log('Client Roles:', clientRoles);

      return roles.concat(clientRoles);
    }

    return [];
  }*!/


  roles: string[] = [];

  constructor(private oauthService: OAuthService) {}

  ngOnInit() {
    this.roles = this.getRoles();
  }

  getRoles(): string[] {
    const accessToken = this.oauthService.getAccessToken();
    const decodedToken = jwt_decode(accessToken);
    return decodedToken.realm_access?.roles || [];
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
*/
