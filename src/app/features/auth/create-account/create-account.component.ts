import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'auth';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { AuthButtonComponent } from '../../../shared/components/auth-button/auth-button.component';
import { AuthStepperComponent } from '../../../shared/components/auth-stepper/auth-stepper.component';
import { InputErrorMessageComponent } from '../../../shared/components/input-error-message/input-error-message.component';
import { passwordMatchValidator } from '../../../shared/utils/password-match.validator';

@Component({
    selector: 'app-create-account',
    imports: [ReactiveFormsModule, AuthButtonComponent, AuthStepperComponent, InputErrorMessageComponent],
    templateUrl: './create-account.component.html',
    styleUrl: './create-account.component.css',
})
export class CreateAccountComponent {
    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly authStateService = inject(AuthStateService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);

    showDataStep = true;
    showPasswordStep = false;
    isDataSubmitAttempted = false;
    isPasswordSubmitAttempted = false;
    showPassword = false;
    showConfirmPassword = false;
    isCreatingAccount = false;
    authErrorMessage = '';
    authSuccessMessage = '';

    accountDataForm: FormGroup = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
    });

    passwordForm: FormGroup = this.fb.group(
        {
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)]],
            confirmPassword: ['', Validators.required],
        },
        { validators: passwordMatchValidator('password', 'confirmPassword') }
    );

    constructor() {
        const verifiedEmail = this.route.snapshot.queryParamMap.get('email');
        if (verifiedEmail) {
            this.accountDataForm.patchValue({ email: verifiedEmail });
        }
    }

    get stepperActiveStep(): number {
        return this.showDataStep ? 3 : 4;
    }

    get firstNameControl(): AbstractControl {
        return this.accountDataForm.get('firstName')!;
    }

    get lastNameControl(): AbstractControl {
        return this.accountDataForm.get('lastName')!;
    }

    get usernameControl(): AbstractControl {
        return this.accountDataForm.get('username')!;
    }

    get emailControl(): AbstractControl {
        return this.accountDataForm.get('email')!;
    }

    get phoneControl(): AbstractControl {
        return this.accountDataForm.get('phone')!;
    }

    get passwordControl(): AbstractControl {
        return this.passwordForm.get('password')!;
    }

    get confirmPasswordControl(): AbstractControl {
        return this.passwordForm.get('confirmPassword')!;
    }

    shouldShowDataError(controlName: string): boolean {
        const control = this.accountDataForm.get(controlName);
        if (!control) {
            return false;
        }

        return control.invalid && (control.touched || this.isDataSubmitAttempted);
    }

    get shouldShowPasswordError(): boolean {
        return this.passwordControl.invalid && (this.passwordControl.touched || this.isPasswordSubmitAttempted);
    }

    get shouldShowConfirmPasswordError(): boolean {
        return this.confirmPasswordControl.invalid && (this.confirmPasswordControl.touched || this.isPasswordSubmitAttempted);
    }

    get passwordsDoNotMatch(): boolean {
        return this.passwordForm.hasError('mismatch') && (this.confirmPasswordControl.touched || this.isPasswordSubmitAttempted);
    }

    onPhoneInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        const value = inputElement.value.replace(/\D/g, '');
        this.phoneControl.setValue(value);
    }

    goToPasswordStep(): void {
        this.isDataSubmitAttempted = true;
        this.accountDataForm.markAllAsTouched();

        if (this.accountDataForm.invalid) {
            return;
        }

        this.showDataStep = false;
        this.showPasswordStep = true;
    }

    goBackToDataStep(): void {
        this.showDataStep = true;
        this.showPasswordStep = false;
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPasswordVisibility(): void {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    onCreateAccount(): void {
        this.isPasswordSubmitAttempted = true;
        this.passwordForm.markAllAsTouched();
        this.authErrorMessage = '';
        this.authSuccessMessage = '';

        if (this.passwordForm.invalid || this.accountDataForm.invalid || this.isCreatingAccount) {
            return;
        }

        this.isCreatingAccount = true;

        this.authService.register({
            firstName: (this.firstNameControl.value ?? '').trim(),
            lastName: (this.lastNameControl.value ?? '').trim(),
            username: (this.usernameControl.value ?? '').trim(),
            email: (this.emailControl.value ?? '').trim().toLowerCase(),
            phone: (this.phoneControl.value ?? '').trim(),
            password: this.passwordControl.value ?? '',
            confirmPassword: this.confirmPasswordControl.value ?? '',
        }).subscribe({
            next: (response: any) => {
                this.isCreatingAccount = false;

                if (response?.token && response?.user) {
                    this.authStateService.setAuthState(response.user, response.token);
                    this.authSuccessMessage = 'Account created successfully. Logging you in...';
                    setTimeout(() => {
                        this.router.navigate(['/home']);
                    }, 900);
                    return;
                }

                this.authSuccessMessage = 'Account created successfully. Redirecting to login...';
                setTimeout(() => {
                    this.router.navigate(['/login'], {
                        queryParams: { username: (this.usernameControl.value ?? '').trim(), created: '1' }
                    });
                }, 1200);
            },
            error: (error) => {
                this.isCreatingAccount = false;
                this.authErrorMessage = error?.error?.message ?? 'Create account failed. Please check your data and try again.';
                console.error('Create account failed:', error);
            },
        });
    }
}
