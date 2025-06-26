import { Component, computed, effect, inject, signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css'],
  standalone: false,
})
export class UserButtonComponent {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  readonly _dropdown = signal<boolean>(false);

  initials = computed(() => {
    const user = this.authService.user();
    return user && user.name && user.lastName
      ? user.name[0] + user.lastName[0]
      : '';
  });
  total = computed(() => this.cartService.cartItems().totalItems);

  toggleDropdown() {
    this._dropdown.set(!this._dropdown());
  }

  constructor() {
    effect(() => {
      this.cartService.getCartItems();
    });
  }
}
