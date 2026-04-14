import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Engine} from "../../entities/engine/engine";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  mainUrl = `${environment.apiUrl}`;
  enginesUrl = `${this.mainUrl}/engines`

  constructor(private http: HttpClient) { }

  public getEnginesByGeneration(generationId: number):Observable<Engine[]>{
    return this.http.get<Engine[]>(`${this.enginesUrl}/gens/${generationId}`);
  }

  public getEnginesByVersion(versionId: number):Observable<Engine[]>{
    return this.http.get<Engine[]>(`${this.enginesUrl}/vers/${versionId}`);

  }
  public getEnginesByModel(modelId: number):Observable<Engine[]>{
    return this.http.get<Engine[]>(`${this.enginesUrl}/mods/${modelId}`);
  }

}
