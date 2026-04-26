import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-account-settings',
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './account-settings.component.html',
    styleUrl: './account-settings.component.css',
})
export class AccountSettingsComponent {
    private readonly fb = inject(FormBuilder);

    readonly sidebarItems = [
        { id: 'profile', label: 'Profile', icon: 'fa-user', description: 'Edit your profile' },
        { id: 'password', label: 'Change Password', icon: 'fa-lock', description: 'Update password' },
    ] as const;

    activeTab: 'profile' | 'password' = 'password';
    showCurrentPassword = false;
    showNewPassword = false;
    showConfirmPassword = false;

    showChangeEmailModal = false;
    showDeleteModal = false;
    changeEmailStep: 1 | 2 = 1;

    deleteConfirmText = '';
    passwordState: 'idle' | 'success' | 'error' = 'idle';
    passwordFeedback = '';

    readonly profileForm = this.fb.group({
        firstName: ['Ahmed', [Validators.required]],
        lastName: ['Abdullah', [Validators.required]],
        username: ['user123', [Validators.required]],
        email: ['user@example.com', [Validators.required, Validators.email]],
        phone: ['01012345678', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
    });

    readonly passwordForm = this.fb.group({
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
    });

    readonly changeEmailForm = this.fb.group({
        email: ['user@example.com', [Validators.required, Validators.email]],
        code1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        code2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        code3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        code4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        code5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        code6: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });

    readonly otpFields = ['code1', 'code2', 'code3', 'code4', 'code5', 'code6'] as const;

    get currentPasswordControl(): AbstractControl {
        return this.passwordForm.get('currentPassword')!;
    }

    get newPasswordControl(): AbstractControl {
        return this.passwordForm.get('newPassword')!;
    }

    get confirmPasswordControl(): AbstractControl {
        return this.passwordForm.get('confirmPassword')!;
    }

    openChangeEmail(): void {
        this.showChangeEmailModal = true;
        this.changeEmailStep = 1;
        this.changeEmailForm.patchValue({
            code1: '',
            code2: '',
            code3: '',
            code4: '',
            code5: '',
            code6: '',
        });
    }

    closeChangeEmail(): void {
        this.showChangeEmailModal = false;
        this.changeEmailStep = 1;
    }

    sendCode(): void {
        const emailControl = this.changeEmailForm.get('email');
        emailControl?.markAsTouched();
        if (emailControl?.invalid) {
            return;
        }

        this.changeEmailStep = 2;
    }

    verifyCode(): void {
        this.otpFields.forEach((field) => this.changeEmailForm.get(field)?.markAsTouched());

        if (this.otpFields.some((field) => this.changeEmailForm.get(field)?.invalid)) {
            return;
        }

        const emailValue = this.changeEmailForm.get('email')?.value ?? '';
        this.profileForm.patchValue({ email: emailValue });
        this.closeChangeEmail();
    }

    saveProfile(): void {
        this.profileForm.markAllAsTouched();
        if (this.profileForm.invalid) {
            return;
        }
    }

    savePassword(): void {
        this.passwordForm.markAllAsTouched();
        const mismatch = this.newPasswordControl.value !== this.confirmPasswordControl.value;
        if (this.passwordForm.invalid || mismatch) {
            this.passwordState = 'error';
            this.passwordFeedback = 'Something went wrong';
            return;
        }

        this.passwordState = 'success';
        this.passwordFeedback = 'Your password has been updated.';
        this.passwordForm.reset();
    }

    toggleCurrentPassword(): void {
        this.showCurrentPassword = !this.showCurrentPassword;
    }

    toggleNewPassword(): void {
        this.showNewPassword = !this.showNewPassword;
    }

    toggleConfirmPassword(): void {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    confirmDelete(): void {
        if (this.deleteConfirmText.trim().toLowerCase() !== 'delete') {
            return;
        }

        this.showDeleteModal = false;
        this.deleteConfirmText = '';
    }

    trackTab(_: number, item: { id: string }): string {
        return item.id;
    }
}
