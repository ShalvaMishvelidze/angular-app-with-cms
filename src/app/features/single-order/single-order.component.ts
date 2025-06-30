import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrl: './single-order.component.css',
  standalone: false,
})
export class SingleOrderComponent {
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  orderId: string | null = null;

  orderDetails = this.cartService.orderDetails;
  askForARefund = this.cartService.askForARefund;

  constructor() {
    this.orderId = this.route.snapshot.paramMap.get('id');

    if (this.orderId) {
      this.cartService.getOrderDetails(this.orderId);
    }
  }
}
