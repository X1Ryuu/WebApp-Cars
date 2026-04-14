import { Injectable } from '@angular/core';
import {Brand} from '../../entities/brand/brand';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({providedIn: 'root'})
export class BrandService {

  mainUrl = `${environment.apiUrl}`;
  brandsUrl = `${this.mainUrl}/brands`
  constructor(private http: HttpClient,   private oauthService: OAuthService) {
  }
  public findAll(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${this.brandsUrl}/all`);
  }



  public addBrand(brand: any){
    console.log("Brand: "+brand);
    const token = this.oauthService.getAccessToken();
    return this.http.post(`${this.brandsUrl}/add`, brand, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  public updateBrand(brand: Brand) :Observable<Brand> {
    return this.http.put<Brand>(`${this.brandsUrl}/update`, brand);
  }

  public deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.brandsUrl}/delete/${id}`);
  }
}
