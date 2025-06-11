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
  private _product = signal<Product | null>(null);
  private _products = signal<Product[] | null>(null);
  private _my_products = signal<Product[] | null>(null);
  private _totalPages = signal<number>(0);
  private _categories = signal<string[] | null>(null);

  readonly isPending = computed(() => this._pending());
  readonly product = computed(() => this._product());
  readonly products = computed(() => this._products());
  readonly myProducts = computed(() => this._my_products());
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
          this._totalPages.set(0);
          this._categories.set(null);
          this._pending.set(false);
        },
      });
  }
  getMyProducts(): void {
    this._pending.set(true);
    this.http
      .get<{ products: Product[] }>(`${this.api_url}/product/me`)
      .subscribe({
        next: ({ products }) => {
          this._my_products.set(products);
          this._pending.set(false);
        },
        error: ({ error, code }) => {
          console.error('Error fetching my products:', error, code);
          this._my_products.set(null);
          this._pending.set(false);
        },
      });
  }
  getProductById(id: string): void {
    this._pending.set(true);
    this._product.set(null);
    this.http.get<Product>(`${this.api_url}/product/${id}`).subscribe({
      next: (product) => {
        this._product.set(product);
        this._pending.set(false);
      },
      error: ({ error, code }) => {
        console.error('Error fetching product by ID:', error, code);
        this._product.set(null);
        this._pending.set(false);
      },
    });
  }
}
