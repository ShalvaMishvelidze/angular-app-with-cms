import { Component, effect, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent {
  private productService = inject(ProductService);

  products: Product[] | null = null;
  isPending = true;
  categories = null;
  sortOptions = [
    {
      label: 'no sort',
      value: '',
    },
  ];

  searchControl = new FormControl();

  handleChange(e: Event) {}

  constructor() {
    this.productService.getMyProducts();
    effect(() => {
      this.products = this.productService.myProducts();
      this.isPending = this.productService.isPending();
    });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query) => {
        console.log(query);

        // this._filters.update((current) => ({
        //   ...current,
        //   search: query,
        // }));
      });
  }
}
