import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import {  Diplomas } from '../../models/diplomas.interface';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService {
  private readonly _httpClient = inject(HttpClient)

  getAllDiplomas(): Observable<Diplomas> {
    return this._httpClient.get<Diplomas>(environment.baseUrl + 'diplomas');
  }
  getDiplomasById(id: string): Observable<Diplomas> {
    return this._httpClient.get<Diplomas>(environment.baseUrl + `diplomas/${id}`);
  }
  
}
