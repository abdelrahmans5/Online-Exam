import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthButtonComponent } from '../../../shared/components/auth-button/auth-button.component';
import { AuthStepperComponent } from '../../../shared/components/auth-stepper/auth-stepper.component';
import { InputErrorMessageComponent } from '../../../shared/components/input-error-message/input-error-message.component';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, RouterLink, AuthButtonComponent, AuthStepperComponent, InputErrorMessageComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    private fb = inject(FormBuilder);

    showEmailStep = true;
    showOtpStep = false;
    isSubmitAttempted = false;
    secondsLeft = 59;
    private countdownTimer: ReturnType<typeof setInterval> | null = null;

    registerForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
    });

    otpForm: FormGroup = this.fb.group({
        digit1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        digit2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        digit3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        digit4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        digit5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        digit6: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });

    get emailControl(): AbstractControl {
        return this.registerForm.get('email')!;
    }

    get otpControls(): AbstractControl[] {
        return [
            this.otpForm.get('digit1')!,
            this.otpForm.get('digit2')!,
            this.otpForm.get('digit3')!,
            this.otpForm.get('digit4')!,
            this.otpForm.get('digit5')!,
            this.otpForm.get('digit6')!,
        ];
    }

    get shouldShowEmailError() {
        return this.emailControl.invalid && (this.emailControl.touched || this.isSubmitAttempted);
    }

    get shouldShowOtpError() {
        return this.otpForm.invalid && this.isSubmitAttempted;
    }

    get stepperActiveStep(): number {
        return this.showEmailStep ? 1 : 2;
    }

    get enteredEmail(): string {
        return this.emailControl.value ?? '';
    }

    goBackToEmailStep() {
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
            this.countdownTimer = null;
        }

        this.showEmailStep = true;
        this.showOtpStep = false;
        this.isSubmitAttempted = false;
        queueMicrotask(() => {
            const emailInput = document.getElementById('register-email') as HTMLInputElement | null;
            emailInput?.focus();
        });
    }

    goToOtpStep() {
        this.isSubmitAttempted = true;
        this.emailControl.markAsTouched();

        if (this.registerForm.invalid) {
            return;
        }

        this.showEmailStep = false;
        this.showOtpStep = true;
        this.isSubmitAttempted = false;
        this.secondsLeft = 59;
        this.startCountdown();
        queueMicrotask(() => {
            const firstOtpInput = document.getElementById('otp-1') as HTMLInputElement | null;
            firstOtpInput?.focus();
        });
    }

    onDigitInput(index: number, event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const numericValue = inputElement.value.replace(/\D/g, '').slice(-1);

        this.otpControls[index].setValue(numericValue);
        inputElement.value = numericValue;

        if (numericValue && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 2}`) as HTMLInputElement | null;
            nextInput?.focus();
        }
    }

    onDigitKeydown(index: number, event: KeyboardEvent) {
        if (event.key !== 'Backspace') {
            return;
        }

        if (this.otpControls[index].value) {
            return;
        }

        if (index > 0) {
            const prevInput = document.getElementById(`otp-${index}`) as HTMLInputElement | null;
            prevInput?.focus();
        }
    }

    onSubmitEmail() {
        this.goToOtpStep();
    }

    onSubmitOtp() {
        this.isSubmitAttempted = true;
        this.otpForm.markAllAsTouched();

        if (this.otpForm.invalid) {
            return;
        }

        // Account verification success placeholder.
    }

    requestNewCode() {
        if (this.secondsLeft > 0) {
            return;
        }

        this.secondsLeft = 59;
        this.startCountdown();
    }

    get countdownText() {
        return `0:${this.secondsLeft.toString().padStart(2, '0')}`;
    }

    ngOnDestroy() {
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
            this.countdownTimer = null;
        }
    }

    private startCountdown() {
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
        }

        this.countdownTimer = setInterval(() => {
            if (this.secondsLeft <= 0) {
                if (this.countdownTimer) {
                    clearInterval(this.countdownTimer);
                    this.countdownTimer = null;
                }
                return;
            }

            this.secondsLeft -= 1;
        }, 1000);
    }
}
