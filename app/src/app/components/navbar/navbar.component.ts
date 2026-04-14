



import { Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { FormsModule } from '@angular/forms';

import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    FormsModule,
    RouterLink,

  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
  login(): void {
    this.authService.login();
  }

  logout(): void {

    this.authService.logout();
    sessionStorage.clear();
    localStorage.clear();


  }

}
