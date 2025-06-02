import { Component, effect, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css'],
})
export class UserButtonComponent {
  private authService = inject(AuthService);
  initials: string | null = null;

  constructor() {
    effect(() => {
      const user = this.authService.user();
      this.initials =
        user && user.name && user.lastName
          ? user.name[0] + user.lastName[0]
          : null;
    });
  }
}
