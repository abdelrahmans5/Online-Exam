import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.css',
})
export class ForgetpassComponent {
  private fb = inject(FormBuilder);

  isSubmitAttempted = false;

  forgetPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private router: Router) { }

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

    this.router.navigate(['/verify-otp']);
  }

}
