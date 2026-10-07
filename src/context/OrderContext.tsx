'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus } from '@/types';

const MOCK_INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-7892',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    items: [
      {
        id: 'uyo-smash-burger-1',
        menuItem: {
          id: 'uyo-smash-burger',
          name: 'Uyo Double Smash Burger',
          category: 'burgers',
          price: 5500,
          description: 'Double beef smash patties, aged cheddar cheese...',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
          prepTime: '15-20 mins',
          available: true
        },
        quantity: 2,
        selectedAddons: [{ id: 'extra-cheese', name: 'Extra Cheddar Cheese', price: 800 }],
        totalPrice: 12600
      },
      {
        id: 'zobo-hibiscus-sparkler-1',
        menuItem: {
          id: 'zobo-hibiscus-sparkler',
          name: 'Zobo Hibiscus Fizz (Craft Soda)',
          category: 'drinks',
          price: 2000,
          description: 'House-brewed Nigerian Zobo...',
          image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
          prepTime: '5 mins',
          available: true
        },
        quantity: 2,
        selectedAddons: [],
        totalPrice: 4000
      }
    ],
    subtotal: 16600,
    deliveryFee: 0,
    discount: 1000,
    total: 15600,
    fulfillmentType: 'delivery',
    deliveryAddress: {
      fullName: 'Emem Bassey',
      phone: '+234 803 123 4567',
      street: '23 Ikpa Road',
      area: 'University District',
      city: 'Uyo',
      landmark: 'Opposite Plaza Park'
    },
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'preparing',
    statusHistory: [
      { status: 'received', timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), note: 'Order received & confirmed' },
      { status: 'preparing', timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), note: 'Kitchen preparing smash patties' }
    ],
    customerName: 'Emem Bassey',
    customerPhone: '+234 803 123 4567',
    estimatedDeliveryTime: '25-35 mins'
  },
  {
    id: 'ORD-7891',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    items: [
      {
        id: 'afang-soup-special-1',
        menuItem: {
          id: 'afang-soup-special',
          name: 'Afang Soup Supreme & Pounded Yam',
          category: 'mains',
          price: 7500,
          description: 'Traditional Akwa Ibom Afang soup...',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
          prepTime: '20-25 mins',
          available: true
        },
        quantity: 1,
        selectedAddons: [],
        totalPrice: 7500
      }
    ],
    subtotal: 7500,
    deliveryFee: 1000,
    discount: 0,
    total: 8500,
    fulfillmentType: 'delivery',
    deliveryAddress: {
      fullName: 'Anietie Akpan',
      phone: '+234 814 987 6543',
      street: '14 Wellington Bassey Way',
      area: 'Ewet Housing Estate',
      city: 'Uyo'
    },
    paymentMethod: 'transfer',
    paymentStatus: 'paid',
    orderStatus: 'out_for_delivery',
    statusHistory: [
      { status: 'received', timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString() },
      { status: 'preparing', timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
      { status: 'ready', timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString() },
      { status: 'out_for_delivery', timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), note: 'Rider Kufre on the way' }
    ],
    customerName: 'Anietie Akpan',
    customerPhone: '+234 814 987 6543',
    estimatedDeliveryTime: '10 mins'
  }
];

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'statusHistory' | 'orderStatus'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(MOCK_INITIAL_ORDERS);

  // Sync state across browser tabs via storage events
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('247flavours_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        localStorage.setItem('247flavours_orders', JSON.stringify(MOCK_INITIAL_ORDERS));
      }
    } catch (e) {
      console.error('Failed to load orders from storage:', e);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === '247flavours_orders' && e.newValue) {
        setOrders(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveOrdersToStorage = (newOrders: Order[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('247flavours_orders', JSON.stringify(newOrders));
    } catch (e) {
      console.error('Failed to save orders:', e);
    }
  };

  const createOrder = (
    orderData: Omit<Order, 'id' | 'createdAt' | 'statusHistory' | 'orderStatus'>
  ): Order => {
    const randomId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    
    const newOrder: Order = {
      ...orderData,
      id: randomId,
      createdAt: now,
      orderStatus: 'received',
      statusHistory: [
        {
          status: 'received',
          timestamp: now,
          note: 'Order placed successfully & sent to kitchen.'
        }
      ]
    };

    const updated = [newOrder, ...orders];
    saveOrdersToStorage(updated);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    const updated = orders.map((ord) => {
      if (ord.id === orderId) {
        const now = new Date().toISOString();
        const newHistory = [
          ...ord.statusHistory,
          { status: newStatus, timestamp: now, note }
        ];
        return {
          ...ord,
          orderStatus: newStatus,
          statusHistory: newHistory
        };
      }
      return ord;
    });
    saveOrdersToStorage(updated);
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
