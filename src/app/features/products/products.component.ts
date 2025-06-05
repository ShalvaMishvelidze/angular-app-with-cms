import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private _filters = signal({
    search: '',
    category: '',
    sort: '',
    order: '',
    page: 1,
  });
  readonly filters = computed(() => this._filters());

  products: Product[] | null = null;
  isPending = true;

  searchControl = new FormControl();

  handleChange(e: Event) {
    const { name, value } = e.target as HTMLInputElement;
    this._filters.update((current) => ({
      ...current,
      [name]: value,
    }));
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query) => {
        this._filters.update((current) => ({
          ...current,
          search: query,
        }));
      });
  }

  constructor() {
    this.productService.getProducts();
    effect(() => {
      this.products = this.productService.products();
      this.isPending = this.productService.isPending();
    });
    effect(
      () => {
        const { search, category, sort, order, page } = this.filters();
        this.productService.getProducts(search, category, sort, order, page);
      },
      { allowSignalWrites: true }
    );
  }
}
