'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyMobileCart() {
  const { cart, total, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white p-4 rounded-2xl shadow-orange-glow flex items-center justify-between font-bold"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <ShoppingBag size={20} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs uppercase tracking-wider text-white/90">
                {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'} IN CART
              </span>
              <span className="text-lg font-extrabold text-white">
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-sm bg-white text-brand-darkGreen px-4 py-2 rounded-xl font-extrabold shadow-sm">
            <span>VIEW CART</span>
            <ArrowRight size={16} />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
