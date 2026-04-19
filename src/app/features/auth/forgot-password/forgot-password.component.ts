import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthButtonComponent } from '../../../shared/components/auth-button/auth-button.component';
import { InputErrorMessageComponent } from '../../../shared/components/input-error-message/input-error-message.component';
import { AuthService } from 'auth';

@Component({
    selector: 'app-forgot-password',
    imports: [ReactiveFormsModule, RouterLink, AuthButtonComponent, InputErrorMessageComponent],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
    private fb = inject(FormBuilder);
    private readonly _authService = inject(AuthService);

    isSubmitAttempted = false;
    sentState = false;
    submittedEmail = '';

    forgetPasswordForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
    });

    get emailControl(): AbstractControl {
        return this.forgetPasswordForm.get('email')!;
    }

    get shouldShowEmailError() {
        return this.emailControl.invalid && (this.emailControl.touched || this.isSubmitAttempted);
    }

    onSubmit() {
        this.isSubmitAttempted = true;
        this.forgetPasswordForm.markAllAsTouched();

        if (this.forgetPasswordForm.invalid) {
            return;
        }

        this._authService.forgotPassword(this.forgetPasswordForm.value).subscribe({
            next: () => {
                this.submittedEmail = this.emailControl.value;
                this.sentState = true;
            },
            error: (error) => {
                console.error('Forgot password failed:', error);
            }
        });
    }

    backToForm() {
        this.sentState = false;
    }
}
