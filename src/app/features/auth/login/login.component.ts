import { Component, effect, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  isPending = false;

  constructor() {
    effect(() => {
      this.isPending = this.authService.isPending();
    });
  }

  loginFrom = this.fb.group({
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
      ],
    ],
  });

  onSubmit() {
    if (this.loginFrom.valid) {
      const formData = this.loginFrom.value;
      this.authService.login({
        email: formData.email ?? '',
        password: formData.password ?? '',
      });
      console.log('Form submitted successfully', formData);
      // this.loginFrom.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
