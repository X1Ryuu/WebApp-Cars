import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment.development';
import {Observable} from "rxjs";
import {Version} from "../../entities/version/version";

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  mainUrl = `${environment.apiUrl}`;
  versionsUrl = `${this.mainUrl}/versions`

  constructor(private http: HttpClient, private oauthService: OAuthService) { }

  public addVersion(version: any){
    console.log("Version: "+version);
    const token = this.oauthService.getAccessToken();
    return this.http.post(`${this.versionsUrl}/add`, version, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

  }
  public getVersionByName(versionName: string | null): Observable<Version>{
    console.log(versionName);
    return this.http.get<Version>(`${this.versionsUrl}/${versionName}`);
  }

  public getVersionsByModelName(modelName: string | null): Observable<Version[]>{
    return this.http.get<Version[]>(`${this.versionsUrl}/mods/${modelName}`);
  }

  public getVersionsByGenerationName(generationName: number): Observable<Version[]>{
    return this.http.get<Version[]>(`${this.versionsUrl}/gens/${generationName}`);
  }

  public getVersionsByGeneration(generationId: number | null): Observable<Version[]>{
    return this.http.get<Version[]>(`${this.versionsUrl}/gens/${generationId}`);
  }

  public getVersionsByModel(modelId: number | null): Observable<Version[]>{
    return this.http.get<Version[]>(`${this.versionsUrl}/mods/${modelId}`);
  }

}
