import { Component, effect, inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false,
})
export class CartComponent {
  private cartService = inject(CartService);

  readonly cartItems = this.cartService.cartItems;

  clearCart = () => this.cartService.clearCart();
  modifyQuantity = this.cartService.modifyQuantity;

  constructor() {
    effect(() => {
      console.log(this.cartItems());
    });
  }
}
