import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { profile } from '../../models/profile/profile.interface';
import { ChangePassword } from '../../models/profile/change-password.interface';
import { RequestEmail } from '../../models/profile/request-email.interface';
import { ConfirmEmail } from '../../models/profile/confirm-email.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _httpClient = inject(HttpClient);

  
  getCurrentUser(): Observable<profile> {
    return this._httpClient.get<profile>(environment.baseUrl + 'users/profile');
  }

  
  updateProfile(payload: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    profilePhoto?: string;
  }): Observable<profile> {
    return this._httpClient.patch<profile>(
      environment.baseUrl + 'users/profile',
      payload
    );
  }

  changePassword(payload: {
    currentPassword: string;
    newPassword: string;
  }): Observable<ChangePassword> {
    return this._httpClient.post<ChangePassword>(
      environment.baseUrl + 'users/change-password',
      payload
    );
  }


  requestEmailChange(email: string): Observable<RequestEmail> {
    return this._httpClient.post<RequestEmail>(
      environment.baseUrl + 'users/email/request',
      { email }
    );
  }


  confirmEmailChange(code: string): Observable<ConfirmEmail> {
    return this._httpClient.post<ConfirmEmail>(
      environment.baseUrl + 'users/email/confirm',
      { code }
    );
  }


  deleteAccount(): Observable<any> {
    return this._httpClient.delete<any>(
      environment.baseUrl + 'users/account'
    );
  }
}
