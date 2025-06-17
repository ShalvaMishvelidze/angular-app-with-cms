import { Component, computed, effect, inject, signal } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private _isEditing = signal(false);

  readonly isEditing = computed(() => this._isEditing());

  user: User | null = null;
  isPending = true;
  askedForVerification = false;
  initials: string | null = null;

  toggleEditing() {
    this._isEditing.update((editing) => !editing);
  }

  handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const name = input.name as 'name' | 'lastName' | 'email';
    const value = input.value;
    if (this.user) {
      this.user[name] = value;
    }
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    this.authService.updateUser(this.user!);
    this.toggleEditing();
  };

  constructor() {
    effect(() => {
      this.user = this.authService.user();
      this.isPending = this.authService.isPending();
      this.askedForVerification = this.authService.askedForVerification();
      this.initials =
        this.user && this.user.name && this.user.lastName
          ? this.user.name[0] + this.user.lastName[0]
          : null;
    });
  }

  askForVerification() {
    this.authService.askForVerification();
  }
}
