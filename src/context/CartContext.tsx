'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, CartItemOption, PromoCode } from '@/types';
import { PROMO_CODES } from '@/data/menuData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, selectedAddons?: CartItemOption[], specialInstructions?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  appliedPromo: PromoCode | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  fulfillmentType: 'delivery' | 'pickup';
  setFulfillmentType: (type: 'delivery' | 'pickup') => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedItemForModal: MenuItem | null;
  setSelectedItemForModal: (item: MenuItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('247flavours_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart:', e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('247flavours_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart]);

  const addToCart = (
    menuItem: MenuItem,
    quantity = 1,
    selectedAddons: CartItemOption[] = [],
    specialInstructions = ''
  ) => {
    const addonPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const itemUnitPrice = menuItem.price + addonPrice;
    
    // Unique ID based on item ID and selected addons
    const addonKey = selectedAddons.map(a => a.id).sort().join('-');
    const cartItemId = `${menuItem.id}-${addonKey}-${specialInstructions.trim()}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * itemUnitPrice,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItem,
          quantity,
          selectedAddons,
          specialInstructions,
          totalPrice: quantity * itemUnitPrice,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const addonPrice = item.selectedAddons.reduce((sum, a) => sum + a.price, 0);
          const unitPrice = item.menuItem.price + addonPrice;
          return {
            ...item,
            quantity,
            totalPrice: quantity * unitPrice,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const deliveryFee = fulfillmentType === 'pickup' ? 0 : subtotal >= 15000 || subtotal === 0 ? 0 : 1000;

  let discount = 0;
  if (appliedPromo && subtotal >= appliedPromo.minOrder) {
    if (appliedPromo.discountType === 'percentage') {
      discount = (subtotal * appliedPromo.discountValue) / 100;
    } else {
      discount = appliedPromo.discountValue;
    }
  }

  const total = Math.max(0, subtotal + deliveryFee - discount);

  const applyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === trimmed);

    if (!found) {
      return { success: false, message: 'Invalid promo code' };
    }

    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Minimum order of ₦${found.minOrder.toLocaleString()} required for this code.`,
      };
    }

    setAppliedPromo(found);
    return { success: true, message: `Promo code ${found.code} applied successfully!` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        deliveryFee,
        total,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        fulfillmentType,
        setFulfillmentType,
        isCartOpen,
        setIsCartOpen,
        selectedItemForModal,
        setSelectedItemForModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
