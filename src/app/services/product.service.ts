import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api_url = environment.api_url;
  private http = inject(HttpClient);

  private _pending = signal<boolean>(true);
  private _products = signal<Product[] | null>(null);
  private _totalPages = signal<number>(0);
  private _categories = signal<string[]>([]);

  readonly isPending = computed(() => this._pending());
  readonly products = computed(() => this._products());
  readonly totalPages = computed(() => this._totalPages());
  readonly categories = computed(() => this._categories());

  constructor() {}

  getProducts(
    search: string = '',
    category: string = '',
    sort: string = '',
    order: string = '',
    page: number = 1
  ): void {
    this._pending.set(true);
    this.http
      .get<{ products: Product[]; pages: number; categories: string[] }>(
        `${this.api_url}/product?search=${search}&category=${category}&sort=${sort}&order=${order}&page=${page}`
      )
      .subscribe({
        next: ({ products, pages, categories }) => {
          this._products.set(products);
          this._totalPages.set(pages);
          this._categories.set(categories);
          this._pending.set(false);
        },
        error: ({ error, code }) => {
          console.error('Error fetching products:', error, code);
          this._products.set(null);
          this._pending.set(false);
        },
      });
  }
}
