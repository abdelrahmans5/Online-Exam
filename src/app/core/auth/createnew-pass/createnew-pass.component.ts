import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-createnew-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './createnew-pass.component.html',
  styleUrl: './createnew-pass.component.css',
})
export class CreatenewPassComponent {
  private fb = inject(FormBuilder);

  showNewPassword = false;
  showConfirmPassword = false;
  isSubmitAttempted = false;

  createPasswordForm: FormGroup = this.fb.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  get newPasswordControl(): AbstractControl {
    return this.createPasswordForm.get('newPassword')!;
  }

  get confirmPasswordControl(): AbstractControl {
    return this.createPasswordForm.get('confirmPassword')!;
  }

  get shouldShowNewPasswordError() {
    return this.newPasswordControl.invalid && (this.newPasswordControl.touched || this.isSubmitAttempted);
  }

  get shouldShowConfirmPasswordError() {
    return this.confirmPasswordControl.invalid && (this.confirmPasswordControl.touched || this.isSubmitAttempted);
  }

  get passwordsDoNotMatch() {
    if (!this.isSubmitAttempted && !this.confirmPasswordControl.touched) {
      return false;
    }

    return this.newPasswordControl.value !== this.confirmPasswordControl.value;
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

    if (this.createPasswordForm.invalid || this.passwordsDoNotMatch) {
      return;
    }
  }

}
