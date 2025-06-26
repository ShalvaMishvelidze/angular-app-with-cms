import { Component, computed, effect, inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false,
})
export class CartComponent {
  private cartService = inject(CartService);

  readonly cartItems = computed(() => this.cartService.cartItems());

  constructor() {
    effect(() => {
      console.log(this.cartItems());
    });
  }
}
