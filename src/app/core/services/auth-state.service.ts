import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
    id: string;
    username: string;
    email: string;
    phone?: string;
    firstName: string;
    lastName: string;
    profilePhoto?: string;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AuthStateService {
    private readonly initialState: AuthState = {
        user: null,
        token: null,
        isAuthenticated: false,
    };

    private authState$ = new BehaviorSubject<AuthState>(this.loadState());

    constructor() { }

    /**
     * Load auth state from localStorage on service initialization
     */
    private loadState(): AuthState {
        const token = localStorage.getItem('token');
        const userJson = localStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;

        return {
            user,
            token,
            isAuthenticated: !!token && !!user,
        };
    }

    /**
     * Get current auth state as Observable
     */
    getAuthState(): Observable<AuthState> {
        return this.authState$.asObservable();
    }

    /**
     * Get current user
     */
    getUser(): User | null {
        return this.authState$.value.user;
    }

    /**
     * Get current token
     */
    getToken(): string | null {
        return this.authState$.value.token;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return this.authState$.value.isAuthenticated;
    }

    /**
     * Set auth state after successful login
     */
    setAuthState(user: User, token: string): void {
        // Store in localStorage for persistence across page reloads
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Update BehaviorSubject
        this.authState$.next({
            user,
            token,
            isAuthenticated: true,
        });
    }

    /**
     * Clear auth state on logout
     */
    clearAuthState(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this.authState$.next(this.initialState);
    }
}
