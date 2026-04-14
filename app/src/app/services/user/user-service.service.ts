import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../entities/user/user';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  brandsUrl = `${environment.apiUrl}/contacts`;
  constructor(private http: HttpClient) {

  }
  public findAll(): Observable<User[]>{
    return this.http.get<User[]>(`${this.brandsUrl}/all`);
  }
}
