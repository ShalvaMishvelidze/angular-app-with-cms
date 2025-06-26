import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private api_url = environment.api_url;
  private http = inject(HttpClient);

  private _cartItems = signal<CartItem[] | null>(null);
  private _totalItems = signal<number>(0);
  private _totalPrice = signal<number>(0);
  private _isPending = signal<boolean>(false);

  readonly cartItems = computed(() => ({
    cartItems: this._cartItems(),
    totalItems: this._totalItems(),
    totalPrice: this._totalPrice(),
    isPending: this._isPending(),
  }));

  constructor() {}

  getCartItems(): void {
    this._isPending.set(true);
    this.http
      .get<{
        cart: CartItem[];
        total: number;
        totalPrice: number;
      }>(`${this.api_url}/user/cart`)
      .subscribe({
        next: ({ cart, total, totalPrice }) => {
          this._cartItems.set(cart);
          this._totalItems.set(total);
          this._totalPrice.set(totalPrice);
          this._isPending.set(false);
        },
        error: (error) => {
          console.error('Error fetching cart items:', error);
          this._cartItems.set(null);
          this._isPending.set(false);
        },
      });
  }

  addToCart(productId: string, quantity: number): void {
    this._isPending.set(true);
    this.http
      .post(`${this.api_url}/user/cart`, { productId, quantity })
      .subscribe({
        next: (response) => {
          console.log('Item added to cart:', response);
          this.getCartItems();
        },
        error: (error) => {
          console.error('Error adding item to cart:', error);
          this._isPending.set(false);
        },
      });
  }

  modifyQuantity = (itemId: string, quantity: number): void => {
    this._isPending.set(true);
    this.http
      .patch(`${this.api_url}/user/cart`, {
        itemId,
        quantity,
      })
      .subscribe({
        next: (response) => {
          console.log('Item quantity increased:', response);
          this.getCartItems();
        },
        error: (error) => {
          console.error('Error increasing item quantity:', error);
          this._isPending.set(false);
        },
      });
  };
  removeCartItem(itemId: string): void {
    this._isPending.set(true);
    this.http
      .delete(`${this.api_url}/user/cart`, { body: { itemId } })
      .subscribe({
        next: (response) => {
          console.log('Item removed from cart:', response);
          this.getCartItems();
        },
        error: (error) => {
          console.error('Error removing item from cart:', error);
          this._isPending.set(false);
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
        this._isPending.set(false);
      },
      error: (error) => {
        console.error('Error clearing cart:', error);
        this._isPending.set(false);
      },
    });
  }
}
