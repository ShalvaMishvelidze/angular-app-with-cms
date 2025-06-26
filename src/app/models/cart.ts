export interface CartItem {
  id: String;
  quantity: number;
  product: {
    name: String;
    price: number;
    stock: number;
    thumbnail: String;
    productId: String;
  };
}
