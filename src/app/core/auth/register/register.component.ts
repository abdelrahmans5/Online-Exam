import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _route = inject(ActivatedRoute);

  showPassword = false;
  showConfirmPassword = false;
  isSubmitAttempted = false;

  registerForm: FormGroup = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)]],
      confirmPassword: [null, [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );

  constructor() {
    const verifiedEmail = this._route.snapshot.queryParamMap.get('email');
    if (verifiedEmail) {
      this.registerForm.patchValue({ email: verifiedEmail });
    }
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword || password === confirmPassword) {
      return null;
    }

    return { mismatch: true };
  }

  get firstNameControl(): AbstractControl {
    return this.registerForm.get('firstName')!;
  }

  get lastNameControl(): AbstractControl {
    return this.registerForm.get('lastName')!;
  }

  get usernameControl(): AbstractControl {
    return this.registerForm.get('username')!;
  }

  get emailControl(): AbstractControl {
    return this.registerForm.get('email')!;
  }

  get phoneControl(): AbstractControl {
    return this.registerForm.get('phone')!;
  }

  get passwordControl(): AbstractControl {
    return this.registerForm.get('password')!;
  }

  get confirmPasswordControl(): AbstractControl {
    return this.registerForm.get('confirmPassword')!;
  }

  shouldShowError(controlName: string) {
    const control = this.registerForm.get(controlName);
    if (!control) {
      return false;
    }
    return control.invalid && (control.touched || this.isSubmitAttempted);
  }

  get shouldShowPasswordMismatch() {
    const confirmControl = this.confirmPasswordControl;
    return this.registerForm.hasError('mismatch') && (confirmControl.touched || this.isSubmitAttempted);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onPhoneInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.replace(/\D/g, '');
    this.phoneControl.setValue(value);
  }

  onSubmit() {
    this.isSubmitAttempted = true;
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return;
    }

    this._authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Register successful:', response);
      },
      error: (error) => {
        console.error('Register failed:', error);
      }
    });
  }

}
