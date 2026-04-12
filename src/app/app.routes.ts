import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '',
        loadComponent: () =>
            import('./core/layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
        children: [...AUTH_ROUTES],
    },
    {
        path: '',
        loadComponent: () =>
            import('./core/layouts/blank-layout/blank-layout.component').then((m) => m.BlankLayoutComponent),
        children: [
            {
                path: 'home',
                title: 'Home',
                loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
            },
        ],
    },
    {
        path: '**',
        title: '404 - Not Found',
        loadComponent: () => import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
    },
];
