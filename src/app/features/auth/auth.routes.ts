import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
    },
    {
        path: 'create-account',
        title: 'Create Account',
        loadComponent: () => import('./create-account/create-account.component').then((m) => m.CreateAccountComponent),
    },
    {
        path: 'forget-password',
        title: 'Forgot Password',
        loadComponent: () => import('./forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
    },
    // Verify OTP and Reset Password are intentionally excluded from app routes for now.
];
