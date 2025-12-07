export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Space' | 'City' | 'Minecraft' | 'Marvel' | 'Duplo' | 'Accessories';
  imageUrl: string;
  rating: number;
  pieces?: number;
  age?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'cod';

export interface OrderDetails {
  orderId: string;
  date: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}