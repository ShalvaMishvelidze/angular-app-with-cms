export interface CartItem {
  id: string;
  quantity: number;
  name: string;
  price: number;
  stock: number;
  thumbnail: { id: string; url: string };
  productId: string;
}
