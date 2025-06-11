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
  getMyProducts(search: string = ''): void {
    this._pending.set(true);
    this.http
      .get<{ products: Product[] }>(
        `${this.api_url}/product/me?search=${search}`
      )
      .subscribe({
        next: ({ products: myProducts }) => {
          this._my_products.set(myProducts);
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
  async uploadToCloudinary(file: File) {
    try {
      const response = await fetch(`${this.api_url}/cloudinary/sign`, {
        method: 'POST',
      });

      const data = await response.json();
      const { signature, timestamp, folder, apiKey, cloudName } = data;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', folder);

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const cloudinaryData = await cloudinaryResponse.json();
      return { url: cloudinaryData.secure_url, id: cloudinaryData.public_id };
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  }
  async deleteFromCloudinary(publicId: string) {
    const response = await fetch(`${this.api_url}/cloudinary/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ publicId }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error deleting from Cloudinary: ${errorData.message}`);
    }
  }
}
