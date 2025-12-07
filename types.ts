export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Unisex' | 'Bales' | 'Perfumes';
  description: string;
  image: string;
  images?: string[]; // Array of image URLs for carousel
  sizes: string[];
  colors: string[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ShippingLocation = 'calabar' | 'outside' | 'international';

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  location: ShippingLocation;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingDetails: UserDetails;
}