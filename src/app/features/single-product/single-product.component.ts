import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  product: Product | null = null;
  isPending = true;

  changeImage(image: string) {
    if (this.product) {
      this.product.thumbnail.url = image;
    }
  }

  addToCart() {
    console.log('Coming soon: Add to cart functionality');
  }

  constructor() {
    this.productService.getProductById(
      this.route.snapshot.paramMap.get('id') || ''
    );
    effect(() => {
      this.product = this.productService.product();
      this.isPending = this.productService.isPending();
    });
  }
}
