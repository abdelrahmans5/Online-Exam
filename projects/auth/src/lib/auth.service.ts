import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthAPI } from './base/authApi';
import { Observable, catchError, of } from 'rxjs';
import { AuthEndPoints } from './enums/AuthEndPoints';
import { confirmEmailVerification } from './interfaces/confirmEmailVerification';
import { emailVerification } from './interfaces/emailVerification';
import { forgotPassword } from './interfaces/forgotPassword';
import { register } from './interfaces/register';
import { resetPassword } from './interfaces/resetPassword';
import { Login, LoginResponse } from './interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthAPI {

  private readonly _httpClient = inject(HttpClient);


  emailVerification(data: emailVerification): Observable<emailVerification> {
    return this._httpClient.post<emailVerification>(AuthEndPoints.emailVerification, data)
      .pipe(catchError(err => of(err)));
  }

  confirmEmailVerification(data: confirmEmailVerification): Observable<confirmEmailVerification> {
    return this._httpClient.post<confirmEmailVerification>(AuthEndPoints.confirmEmailVerification, data)
      .pipe(catchError(err => of(err)));
  }

  register(data: register): Observable<register> {
    return this._httpClient.post<register>(AuthEndPoints.register, data)
      .pipe(catchError(err => of(err)));
  }

  login(data: Login): Observable<LoginResponse> {
    return this._httpClient.post<LoginResponse>(AuthEndPoints.login, data);
  }

  forgotPassword(data: forgotPassword): Observable<forgotPassword> {
    return this._httpClient.post<forgotPassword>(AuthEndPoints.forgotPassword, data)
      .pipe(catchError(err => of(err)));
  }

  resetPassword(data: resetPassword): Observable<resetPassword> {
    return this._httpClient.post<resetPassword>(AuthEndPoints.resetPassword, data)
      .pipe(catchError(err => of(err)));
  }

}
