import { Component, inject } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  private authService = inject(AuthService);
  user: User | null = null;

  constructor() {
    this.user = this.authService.user();
  }

  askForVerification() {
    this.authService.askForVerification();
  }
}
