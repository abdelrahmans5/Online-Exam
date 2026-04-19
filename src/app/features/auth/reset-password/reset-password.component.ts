import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthButtonComponent } from '../../../shared/components/auth-button/auth-button.component';
import { AuthStepperComponent } from '../../../shared/components/auth-stepper/auth-stepper.component';
import { InputErrorMessageComponent } from '../../../shared/components/input-error-message/input-error-message.component';
import { passwordMatchValidator } from '../../../shared/utils/password-match.validator';
import { AuthService } from 'auth';

@Component({
    selector: 'app-reset-password',
    imports: [ReactiveFormsModule, RouterLink, AuthButtonComponent, AuthStepperComponent, InputErrorMessageComponent],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
    private fb = inject(FormBuilder);
    private readonly _authService = inject(AuthService);
    private readonly _route = inject(ActivatedRoute);

    showNewPassword = false;
    showConfirmPassword = false;
    isSubmitAttempted = false;

    createPasswordForm: FormGroup = this.fb.group(
        {
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        },
        { validators: passwordMatchValidator('newPassword', 'confirmPassword') }
    );

    get confirmPasswordControl(): AbstractControl {
        return this.createPasswordForm.get('confirmPassword')!;
    }

    get shouldShowNewPasswordError() {
        const control = this.createPasswordForm.get('newPassword');
        return !!control && control.invalid && (control.touched || this.isSubmitAttempted);
    }

    get shouldShowConfirmPasswordError() {
        return this.confirmPasswordControl.invalid && (this.confirmPasswordControl.touched || this.isSubmitAttempted);
    }

    get passwordsDoNotMatch() {
        return this.createPasswordForm.hasError('mismatch') && (this.confirmPasswordControl.touched || this.isSubmitAttempted);
    }

    toggleNewPasswordVisibility() {
        this.showNewPassword = !this.showNewPassword;
    }

    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    onSubmit() {
        this.isSubmitAttempted = true;
        this.createPasswordForm.markAllAsTouched();

        if (this.createPasswordForm.invalid) {
            return;
        }

        const token = this._route.snapshot.queryParamMap.get('token') ?? '';
        if (!token) {
            console.error('Reset password token is missing from query parameters.');
            return;
        }

        this._authService.resetPassword({
            token,
            newPassword: this.createPasswordForm.get('newPassword')?.value,
            confirmPassword: this.confirmPasswordControl.value,
        }).subscribe({
            next: (response) => {
                console.log('Reset password successful:', response);
            },
            error: (error) => {
                console.error('Reset password failed:', error);
            }
        });
    }
}
