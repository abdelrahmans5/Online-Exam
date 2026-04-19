import { AuthService } from 'auth';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthButtonComponent } from '../../../shared/components/auth-button/auth-button.component';
import { ErrorBannerComponent } from '../../../shared/components/error-banner/error-banner.component';
import { InputErrorMessageComponent } from '../../../shared/components/input-error-message/input-error-message.component';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, RouterLink, AuthButtonComponent, ErrorBannerComponent, InputErrorMessageComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {

    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);

    private fb = inject(FormBuilder);

    showPassword = false;
    isSubmitAttempted = false;
    authErrorMessage = '';

    loginForm: FormGroup = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });

    get usernameControl(): AbstractControl {
        return this.loginForm.get('username')!;
    }

    get passwordControl(): AbstractControl {
        return this.loginForm.get('password')!;
    }

    get shouldShowUsernameError() {
        return this.usernameControl.invalid && (this.usernameControl.touched || this.isSubmitAttempted);
    }

    get shouldShowPasswordError() {
        return this.passwordControl.invalid && (this.passwordControl.touched || this.isSubmitAttempted);
    }

    get shouldShowFormError() {
        return this.loginForm.invalid && this.isSubmitAttempted;
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        this.isSubmitAttempted = true;
        this.loginForm.markAllAsTouched();
        this.authErrorMessage = '';

        if (this.loginForm.invalid) {
            return;
        }

        const payload = {
            username: (this.usernameControl.value ?? '').trim(),
            password: this.passwordControl.value ?? '',
        };

        this._authService.login(payload).subscribe({
            next: (response) => {
                console.log('Login API response:', response);

                if (response?.token && response?.user) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(response.user ?? {}));
                    this._router.navigate(['/home']);
                    return;
                }

                console.error('Login API returned invalid payload:', response);
                this.authErrorMessage = 'Invalid username or password';
            },
            error: (error) => {
                console.error('Login API error:', error);
                this.authErrorMessage = error?.error?.message ?? 'Login failed. Please try again.';
            }
        });
    }
}
