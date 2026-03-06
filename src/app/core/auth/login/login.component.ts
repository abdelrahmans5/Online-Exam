import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  showPassword = false;
  isSubmitAttempted = false;

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

    if (this.loginForm.invalid) {
      return;
    }
  }

}
