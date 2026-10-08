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
        transition={{ type: 'spring', damping: 22, stiffness: 220 }}
        className="fixed bottom-[calc(12px+env(safe-area-inset-bottom,0px))] left-3 right-3 sm:left-4 sm:right-4 z-40 md:hidden max-w-md mx-auto"
      >
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label={`View cart with ${totalItems} items for ₦${total.toLocaleString()}`}
          className="w-full bg-[#BD3C0D] hover:bg-[#A93209] text-white p-3 sm:p-4 rounded-2xl shadow-[0_10px_30px_rgba(189,60,13,0.35)] flex items-center justify-between font-bold border border-white/20 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="bg-white/20 p-2 sm:p-2.5 rounded-xl flex-shrink-0">
              <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/90 truncate font-black">
                {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
              </span>
              <span className="text-base sm:text-lg font-black text-white leading-tight">
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-xs sm:text-sm bg-white text-[#062D26] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black shadow-sm flex-shrink-0">
            <span>VIEW CART</span>
            <ArrowRight size={15} strokeWidth={2.5} />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
