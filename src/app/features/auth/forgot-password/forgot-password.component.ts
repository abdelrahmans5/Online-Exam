import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthButtonComponent } from '../../../shared/components/auth-button/auth-button.component';
import { InputErrorMessageComponent } from '../../../shared/components/input-error-message/input-error-message.component';

@Component({
    selector: 'app-forgot-password',
    imports: [ReactiveFormsModule, RouterLink, AuthButtonComponent, InputErrorMessageComponent],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
    private fb = inject(FormBuilder);

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

        this.submittedEmail = this.emailControl.value;
        this.sentState = true;
    }

    backToForm() {
        this.sentState = false;
    }
}
