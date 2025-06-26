import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private api_url = environment.api_url;
  private http = inject(HttpClient);

  private _cartItems = signal<any[] | null>(null);
  private _totalItems = signal<number>(0);
  private _totalPrice = signal<number>(0);

  readonly cartItems = computed(() => ({
    cartItems: this._cartItems(),
    totalItems: this._totalItems(),
    totalPrice: this._totalPrice(),
  }));

  constructor() {}

  getCartItems(): void {
    this.http.get<any[]>(`${this.api_url}/user/cart`).subscribe({
      next: ({ cart, total, totalPrice }: any) => {
        this._cartItems.set(cart);
        this._totalItems.set(total);
        this._totalPrice.set(totalPrice);
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
        this._cartItems.set(null);
      },
    });
  }

  addToCart(item: any): void {
    this.http.post(`${this.api_url}/user/cart`, item).subscribe({
      next: (response) => {
        console.log('Item added to cart:', response);
      },
      error: (error) => {
        console.error('Error adding item to cart:', error);
      },
    });
  }

  increaseItemQuantity(item: any): void {
    this.http
      .post(`${this.api_url}/user/cart`, {
        itemId: item.id,
        quantity: item.quantity + 1,
      })
      .subscribe({
        next: (response) => {
          console.log('Item quantity increased:', response);
          this.getCartItems(); // Refresh cart items
        },
        error: (error) => {
          console.error('Error increasing item quantity:', error);
        },
      });
  }
  decreaseItemQuantity(item: any): void {
    this.http
      .post(`${this.api_url}/user/cart`, {
        itemId: item.id,
        quantity: item.quantity - 1,
      })
      .subscribe({
        next: (response) => {
          console.log('Item quantity increased:', response);
          this.getCartItems(); // Refresh cart items
        },
        error: (error) => {
          console.error('Error increasing item quantity:', error);
        },
      });
  }
  removeCartItem(itemId: string): void {
    this.http
      .delete(`${this.api_url}/user/cart`, { body: { itemId } })
      .subscribe({
        next: (response) => {
          console.log('Item removed from cart:', response);
          this.getCartItems(); // Refresh cart items
        },
        error: (error) => {
          console.error('Error removing item from cart:', error);
        },
      });
  }
  clearCart(): void {
    this.http.delete(`${this.api_url}/user/cart/clear`).subscribe({
      next: (response) => {
        console.log('Cart cleared:', response);
        this._cartItems.set(null);
        this._totalItems.set(0);
        this._totalPrice.set(0);
      },
      error: (error) => {
        console.error('Error clearing cart:', error);
      },
    });
  }
}
