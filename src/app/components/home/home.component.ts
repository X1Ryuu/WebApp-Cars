import { Component } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {AuthService} from "../../services/auth/auth.service";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  helloUrl: string = `${environment.apiUrl}`;
  helloText: string = '';

  constructor(
      private oauthService: OAuthService,
      private authService: AuthService,
      private http: HttpClient
  ){}
  getHelloText() {
    console.log(this.oauthService.getAccessTokenExpiration());
    this.http
        .get<{ message: string }>(`${this.helloUrl}/brands/hello`, {
          headers: { Authorization: 'Bearer ' + this.oauthService.getAccessToken() },
        })
        .subscribe((result) => {
          if (this.oauthService.hasValidAccessToken()) {
            this.helloText = result.message;

          } else {
            console.log('Token is not valid');
          }
        });
    console.log(
        'Access Token:',
        this.oauthService.getAccessToken(),
        '\n\nIsValid?:',
        this.oauthService.hasValidAccessToken(),
        this.authService.roles
    );
  }
}
