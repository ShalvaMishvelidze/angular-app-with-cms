import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
  standalone: false,
})
export class SingleProductComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);

  readonly isPending = computed<boolean>(() => this.productService.isPending());
  readonly cartIsPending = computed<boolean>(
    () => this.cartService.cartItems().isPending
  );

  product: Product | null = null;

  changeImage(image: string) {
    if (this.product) {
      this.product.thumbnail.url = image;
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product?.id || '', 1);
  }

  constructor() {
    this.productService.getProductById(
      this.route.snapshot.paramMap.get('id') || ''
    );
    effect(() => {
      this.product = this.productService.product();
    });
  }
}
