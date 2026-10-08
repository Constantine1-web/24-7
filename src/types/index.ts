export type CategoryId = 'all' | 'burgers' | 'mains' | 'snacks' | 'pizza' | 'chicken' | 'drinks' | 'desserts' | 'pastries' | 'fries' | string;

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // in Naira (₦)
  description: string;
  image: string;
  badge?: string;
  spicy?: boolean;
  popular?: boolean;
  prepTime: string;
  calories?: string;
  available: boolean;
  allowedAddons?: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface CartItemOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedAddons: CartItemOption[];
  specialInstructions?: string;
  totalPrice: number;
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  street: string;
  area: string;
  city: string;
  landmark?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  fulfillmentType: 'delivery' | 'pickup';
  deliveryAddress?: DeliveryAddress;
  paymentMethod: 'card' | 'transfer' | 'cash';
  paymentStatus: 'paid' | 'pending';
  orderStatus: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
  customerName: string;
  customerPhone: string;
  estimatedDeliveryTime: string;
  notes?: string;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  description: string;
}
