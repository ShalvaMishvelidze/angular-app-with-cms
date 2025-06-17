import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css'],
    standalone: false
})
export class DropdownComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
