import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthButtonComponent } from '../../../shared/components/auth-button/auth-button.component';
import { AuthStepperComponent } from '../../../shared/components/auth-stepper/auth-stepper.component';
import { InputErrorMessageComponent } from '../../../shared/components/input-error-message/input-error-message.component';

@Component({
    selector: 'app-verify-otp',
    imports: [ReactiveFormsModule, RouterLink, AuthButtonComponent, AuthStepperComponent, InputErrorMessageComponent],
    templateUrl: './verify-otp.component.html',
    styleUrl: './verify-otp.component.css',
})
export class VerifyOtpComponent {
    private fb = inject(FormBuilder);

    isSubmitAttempted = false;
    secondsLeft = 13;

    otpForm: FormGroup = this.fb.group({
        digit1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        digit2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        digit3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        digit4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        digit5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        digit6: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });

    private countdownTimer: ReturnType<typeof setInterval> | null = null;

    constructor(private router: Router) {
        this.startCountdown();
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

    get shouldShowOtpError() {
        return this.otpForm.invalid && this.isSubmitAttempted;
    }

    get countdownText() {
        return `0:${this.secondsLeft.toString().padStart(2, '0')}`;
    }

    onDigitInput(index: number, event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const rawValue = inputElement.value;
        const numericValue = rawValue.replace(/\D/g, '').slice(-1);

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

    requestNewCode() {
        if (this.secondsLeft > 0) {
            return;
        }

        this.secondsLeft = 13;
        this.startCountdown();
    }

    onSubmit() {
        this.isSubmitAttempted = true;
        this.otpForm.markAllAsTouched();

        if (this.otpForm.invalid) {
            return;
        }

        this.router.navigate(['/login']);
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
