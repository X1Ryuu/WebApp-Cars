import {AfterViewInit, Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {AuthService} from "../../services/auth/auth.service";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {SupabaseService} from "../../services/supabase/supabase.service";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit{
  helloUrl: string = `${environment.apiUrl}`;
  helloText: string = '';
  imgUrls: string[] = [];

  constructor(
      private oauthService: OAuthService,
      private authService: AuthService,
      private http: HttpClient,
      private supabase: SupabaseService
  ){
    console.log(this.imgUrls)
  }
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

  ngOnInit(): void {
    this.imgUrls.push(this.supabase.getPublicImageUrl("home/pexels-lukzy-15469363.jpg"));
    this.imgUrls.push(this.supabase.getPublicImageUrl("home/pexels-caue-krebsky-oliveira-1386270711-28561173.jpg"));
    this.imgUrls.push(this.supabase.getPublicImageUrl("home/pexels-atelierbyvineeth-35070137.jpg"));
  }

  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');


    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }else{
          entry.target.classList.remove('show');
        }
      });
    }, {
      threshold: 0.2
    });

    elements.forEach(el => observer.observe(el));
  }
}
