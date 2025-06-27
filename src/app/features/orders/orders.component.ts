import { Component, inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: false,
})
export class OrdersComponent {
  private cartService = inject(CartService);

  orders = this.cartService.orders;

  constructor() {
    this.cartService.getOrders();
  }
}
