import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { DiplomasResponse } from '../../models/diplomas.interface';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService {
  private readonly _httpClient = inject(HttpClient)

  getAllDiplomas(): Observable<DiplomasResponse> {
    return this._httpClient.get<DiplomasResponse>(environment.baseUrl + 'diplomas');
  }
}
