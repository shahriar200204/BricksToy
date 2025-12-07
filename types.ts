export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
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

export type OrderStatus = 'Pending' | 'Paid' | 'Shipped' | 'Cancelled';

export interface Coupon {
  code: string;
  discountType: 'percent' | 'fixed'; // percent (e.g., 10%) or fixed amount (e.g., 100 tk)
  value: number;
  isActive: boolean;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: PaymentMethod;
  transactionId?: string; // For verification
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
}