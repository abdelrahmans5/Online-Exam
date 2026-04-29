import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { profile, User } from '../../core/models/profile/profile.interface';

@Component({
    selector: 'app-account-settings',
    imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
    templateUrl: './account-settings.component.html',
    styleUrl: './account-settings.component.css',
})
export class AccountSettingsComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly usersService = inject(UsersService);
    private readonly router = inject(Router);


    // Active tab
    activeTab: 'profile' | 'password' = 'profile';

    // Password visibility toggles
    showCurrentPassword = false;
    showNewPassword = false;
    showConfirmPassword = false;

    // Modals
    showChangeEmailModal = false;
    showDeleteModal = false;
    changeEmailStep: 1 | 2 = 1;
    deleteConfirmText = '';

    // Loading and error states
    isLoadingProfile = true;
    isSavingProfile = false;
    isSavingPassword = false;
    isRequestingEmailChange = false;
    isConfirmingEmail = false;
    isDeletingAccount = false;

    profileError = '';
    passwordError = '';
    emailChangeError = '';
    successMessage = '';
    passwordMessage = '';

    // Forms
    readonly profileForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
    });

    readonly passwordForm = this.fb.group({
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.passwordMatchValidator.bind(this) });


    private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
        const newPassword = group.get('newPassword')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;

        if (!newPassword || !confirmPassword) {
            return null;
        }

        return newPassword === confirmPassword ? null : { passwordMismatch: true };
    }

    readonly changeEmailForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        code1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        code2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        code3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        code4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        code5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        code6: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });

    readonly otpFields = ['code1', 'code2', 'code3', 'code4', 'code5', 'code6'] as const;

    get currentPasswordControl(): AbstractControl | null {
        return this.passwordForm.get('currentPassword');
    }

    get newPasswordControl(): AbstractControl | null {
        return this.passwordForm.get('newPassword');
    }

    get confirmPasswordControl(): AbstractControl | null {
        return this.passwordForm.get('confirmPassword');
    }

    ngOnInit(): void {
        this.loadProfile();
    }

    private loadProfile(): void {
        this.isLoadingProfile = true;
        this.profileError = '';

        this.usersService.getCurrentUser().subscribe({
            next: (response) => {
                if (response.payload?.user) {
                    const user = response.payload.user;
                    this.profileForm.patchValue({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email,
                        phone: user.phone || '',
                    });
                }
                this.isLoadingProfile = false;
            },
            error: (err) => {
                console.error('Failed to load profile', err);
                this.profileError = err.error?.message || 'Failed to load profile. Please try again.';
                this.isLoadingProfile = false;
            },
        });
    }

    saveProfile(): void {
        this.profileForm.markAllAsTouched();
        if (this.profileForm.invalid) {
            return;
        }

        this.isSavingProfile = true;
        this.profileError = '';
        this.successMessage = '';

        const { firstName, lastName, phone } = this.profileForm.value;
        this.usersService.updateProfile({
            firstName: firstName || '',
            lastName: lastName || '',
            phone: phone || '',
        }).subscribe({
            next: () => {
                this.successMessage = 'Profile updated successfully!';
                this.isSavingProfile = false;
                setTimeout(() => (this.successMessage = ''), 3000);
            },
            error: (err) => {
                console.error('Failed to update profile', err);
                this.profileError = err.error?.message || 'Failed to update profile. Please try again.';
                this.isSavingProfile = false;
            },
        });
    }


    savePassword(): void {
        this.passwordForm.markAllAsTouched();

        if (this.passwordForm.invalid) {
            if (this.passwordForm.hasError('passwordMismatch')) {
                this.passwordError = 'New passwords do not match.';
            } else if (this.newPasswordControl?.hasError('minlength') || this.confirmPasswordControl?.hasError('minlength')) {
                this.passwordError = 'Password must be at least 8 characters long.';
            } else {
                this.passwordError = 'Please fill in all fields with valid data.';
            }
            return;
        }

        this.isSavingPassword = true;
        this.passwordError = '';
        this.passwordMessage = '';

        this.usersService
            .changePassword({
                currentPassword: this.currentPasswordControl?.value || '',
                newPassword: this.newPasswordControl?.value || '',
            })
            .subscribe({
                next: () => {
                    this.passwordMessage = 'Password changed successfully!';
                    this.passwordForm.reset();
                    this.showCurrentPassword = false;
                    this.showNewPassword = false;
                    this.showConfirmPassword = false;
                    this.isSavingPassword = false;
                    setTimeout(() => (this.passwordMessage = ''), 3000);
                },
                error: (err) => {
                    console.error('Failed to change password', err);
                    this.passwordError = err.error?.message || 'Failed to change password. Please check your current password and try again.';
                    this.isSavingPassword = false;
                },
            });
    }


    openChangeEmail(): void {
        this.showChangeEmailModal = true;
        this.changeEmailStep = 1;
        this.changeEmailForm.patchValue({
            email: this.profileForm.get('email')?.value || '',
            code1: '',
            code2: '',
            code3: '',
            code4: '',
            code5: '',
            code6: '',
        });
        this.emailChangeError = '';
    }


    closeChangeEmail(): void {
        this.showChangeEmailModal = false;
        this.changeEmailStep = 1;
        this.emailChangeError = '';
        this.changeEmailForm.reset();
    }


    sendCode(): void {
        const emailControl = this.changeEmailForm.get('email');
        emailControl?.markAsTouched();

        if (!emailControl || emailControl.invalid) {
            this.emailChangeError = 'Please enter a valid email address.';
            return;
        }

        this.isRequestingEmailChange = true;
        this.emailChangeError = '';

        const emailValue = emailControl.value || '';
        this.usersService.requestEmailChange(emailValue).subscribe({
            next: () => {
                this.changeEmailStep = 2;
                this.isRequestingEmailChange = false;
            },
            error: (err) => {
                console.error('Failed to request email change', err);
                this.emailChangeError = err.error?.message || 'Failed to send verification code. Please try again.';
                this.isRequestingEmailChange = false;
            },
        });
    }


    verifyCode(): void {
        this.otpFields.forEach((field) => this.changeEmailForm.get(field)?.markAsTouched());

        if (this.otpFields.some((field) => this.changeEmailForm.get(field)?.invalid)) {
            this.emailChangeError = 'Please enter all 6 digits.';
            return;
        }

        const code = this.otpFields.map((field) => this.changeEmailForm.get(field)?.value).join('');
        this.isConfirmingEmail = true;
        this.emailChangeError = '';

        this.usersService.confirmEmailChange(code).subscribe({
            next: (response) => {
                if (response.payload?.user?.email) {
                    this.profileForm.patchValue({ email: response.payload.user.email });
                    this.closeChangeEmail();
                    this.successMessage = 'Email changed successfully!';
                    setTimeout(() => (this.successMessage = ''), 3000);
                }
                this.isConfirmingEmail = false;
            },
            error: (err) => {
                console.error('Failed to confirm email', err);
                this.emailChangeError = err.error?.message || 'Invalid verification code. Please try again.';
                this.isConfirmingEmail = false;
            },
        });
    }


    confirmDelete(): void {
        if (this.deleteConfirmText.trim().toLowerCase() !== 'delete') {
            return;
        }

        this.isDeletingAccount = true;
        this.usersService.deleteAccount().subscribe({
            next: () => {
                this.showDeleteModal = false;
                this.deleteConfirmText = '';
                // Redirect to login after account deletion
                window.location.href = '/login';
            },
            error: (err) => {
                console.error('Failed to delete account', err);
                alert(err.error?.message || 'Failed to delete account. Please try again.');
                this.isDeletingAccount = false;
            },
        });
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
}
