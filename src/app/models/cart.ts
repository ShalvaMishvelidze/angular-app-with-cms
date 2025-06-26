export interface CartItem {
  id: String;
  quantity: number;
  name: String;
  price: number;
  stock: number;
  thumbnail: { id: String; url: String };
  productId: String;
}
