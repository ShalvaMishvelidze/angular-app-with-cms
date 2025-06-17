import { Component, effect, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: false
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isPending = false;

  constructor() {
    effect(() => {
      this.isPending = this.authService.isPending();
    });
  }

  passwordMatchValidator: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({
        ...(confirmPassword.errors || {}),
        mismatch: true,
      });
    } else if (confirmPassword?.hasError('mismatch')) {
      const { mismatch, ...rest } = confirmPassword.errors || {};
      confirmPassword.setErrors(Object.keys(rest).length ? rest : null);
    }

    return null;
  };

  registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[0-9]/),
          Validators.pattern(/[\W_]/),
          Validators.pattern(/^\S+$/),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.authService.register({
        name: formData.name ?? '',
        lastName: formData.lastName ?? '',
        email: formData.email ?? '',
        password: formData.password ?? '',
        confirmPassword: formData.confirmPassword ?? '',
      });
      this.registerForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
