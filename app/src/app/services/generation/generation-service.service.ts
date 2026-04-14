import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {OAuthService} from "angular-oauth2-oidc";
import {Observable} from "rxjs";
import {Generation} from "../../entities/generation/generation";

@Injectable({
  providedIn: 'root'
})
export class GenerationService {

  mainUrl = `${environment.apiUrl}`;
  generationsUrl = `${this.mainUrl}/generations`
  constructor(private http: HttpClient,   private oauthService: OAuthService) {
  }
  public findAll(): Observable<Generation[]>{
    return this.http.get<Generation[]>(`${this.generationsUrl}/all`);
  }

  public getGenerationsByModel(nameId: number): Observable<Generation[]>{
 //   console.log(nameId);
    return this.http.get<Generation[]>(`${this.generationsUrl}/${nameId}`);
  }

/*  public getGenerationsByModelName(name: string | null): Observable<Generation[]>{
    //console.log("Modelname: ", name);
    return this.http.get<Generation[]>(`${this.generationsUrl}/name/${name}`);
  }*/



  public addGeneration(generation: any){
    console.log("Generation: "+generation);
    const token = this.oauthService.getAccessToken();
    return this.http.post(`${this.generationsUrl}/add`, generation, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  public updateBrand(generation: Generation) :Observable<Generation> {
    return this.http.put<Generation>(`${this.generationsUrl}/update`, generation);
  }

  public deleteGeneration(id: number): Observable<void> {
    return this.http.delete<void>(`${this.generationsUrl}/delete/${id}`);
  }
}
