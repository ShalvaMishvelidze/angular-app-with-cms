import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-user-button',
    templateUrl: './user-button.component.html',
    styleUrls: ['./user-button.component.css'],
    standalone: false
})
export class UserButtonComponent {
  private authService = inject(AuthService);
  readonly _dropdown = signal<boolean>(false);
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

  toggleDropdown() {
    this._dropdown.set(!this._dropdown());
  }
}
