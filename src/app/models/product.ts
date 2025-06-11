export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  thumbnail: { url: string; id: string };
  images: { url: string; id: string }[];
  discount: number;
  stock: number;
  rating: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
