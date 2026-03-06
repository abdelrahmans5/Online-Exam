import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { ForgetpassComponent } from './core/auth/forgetpass/forgetpass.component';
import { CreatenewPassComponent } from './core/auth/createnew-pass/createnew-pass.component';
import { VerifyOtpComponent } from './core/auth/verify-otp/verify-otp.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: '', component: AuthLayoutComponent, children: [
            { path: 'login', component: LoginComponent, title: 'Login' },
            { path: 'register', component: RegisterComponent, title: 'Register' },
            { path: 'forget-password', component: ForgetpassComponent, title: 'Forgot Password' },
            { path: 'verify-otp', component: VerifyOtpComponent, title: 'Forgot Password' },
            { path: 'create-new-password', component: CreatenewPassComponent, title: 'Create New Password' }
        ]
    },
    {
        path: '', component: BlankLayoutComponent, children: [
            { path: 'home', component: HomeComponent, title: 'Home' }
        ]
    },
    {
        path: '**', component: NotFoundComponent, title: '404 - Not Found'
    }
];
