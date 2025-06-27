import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: false,
})
export class CheckoutComponent {
  constructor(private cartService: CartService) {
    this.cartService.clearCart();
  }
  cartItems = this.cartService.cartItems;
}
