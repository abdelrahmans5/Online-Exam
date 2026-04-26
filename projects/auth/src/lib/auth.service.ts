import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthAPI } from './base/authApi';
import { Observable, catchError, tap, throwError } from 'rxjs';
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
  private readonly _logPrefix = '[Auth API]';

  private traceRequest<T>(operation: string, url: string, data: unknown): Observable<T> {
    const startedAt = Date.now();
    const maskedPayload = this.maskSensitiveFields(data);

    console.groupCollapsed(`${this._logPrefix} ${operation} REQUEST`);
    console.log('url:', url);
    console.log('payload:', maskedPayload);
    console.groupEnd();

    return this._httpClient.post<T>(url, data).pipe(
      tap((response) => {
        const elapsedMs = Date.now() - startedAt;
        console.groupCollapsed(`${this._logPrefix} ${operation} SUCCESS (${elapsedMs}ms)`);
        console.log('url:', url);
        console.log('response:', response);
        console.groupEnd();
      }),
      catchError((err) => {
        const elapsedMs = Date.now() - startedAt;
        console.groupCollapsed(`${this._logPrefix} ${operation} ERROR (${elapsedMs}ms)`);
        console.log('url:', url);
        console.log('payload:', maskedPayload);
        console.error('status:', err?.status);
        console.error('message:', err?.error?.message ?? err?.message);
        console.error('error body:', err?.error);
        console.groupEnd();

        return throwError(() => err);
      })
    );
  }

  private maskSensitiveFields(value: unknown): unknown {
    if (!value || typeof value !== 'object') {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.maskSensitiveFields(item));
    }

    const sensitiveKeys = new Set(['password', 'confirmPassword', 'newPassword', 'currentPassword', 'token']);
    const source = value as Record<string, unknown>;
    const masked: Record<string, unknown> = {};

    for (const [key, fieldValue] of Object.entries(source)) {
      if (sensitiveKeys.has(key)) {
        masked[key] = '***';
        continue;
      }

      masked[key] = this.maskSensitiveFields(fieldValue);
    }

    return masked;
  }

  emailVerification(data: emailVerification): Observable<emailVerification> {
    return this.traceRequest<emailVerification>('emailVerification', AuthEndPoints.emailVerification, data);
  }

  confirmEmailVerification(data: confirmEmailVerification): Observable<confirmEmailVerification> {
    return this.traceRequest<confirmEmailVerification>('confirmEmailVerification', AuthEndPoints.confirmEmailVerification, data);
  }

  register(data: register): Observable<LoginResponse> {
    return this.traceRequest<LoginResponse>('register', AuthEndPoints.register, data);
  }

  login(data: Login): Observable<LoginResponse> {
    return this.traceRequest<LoginResponse>('login', AuthEndPoints.login, data);
  }

  forgotPassword(data: forgotPassword): Observable<forgotPassword> {
    return this.traceRequest<forgotPassword>('forgotPassword', AuthEndPoints.forgotPassword, data);
  }

  resetPassword(data: resetPassword): Observable<resetPassword> {
    return this.traceRequest<resetPassword>('resetPassword', AuthEndPoints.resetPassword, data);
  }

}
