'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    discount,
    total,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    fulfillmentType,
    setFulfillmentType,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoSuccess(res.message);
      setPromoInput('');
    } else {
      setPromoError(res.message);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-brand-darkGreen/60 backdrop-blur-md"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
            className="w-screen max-w-[440px] bg-brand-parchment shadow-2xl flex flex-col relative"
          >
            {/* Subtle Brand Doodle Texture Layer */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply z-0" style={{ backgroundImage: "url('/images/food-doodles-core.png')", backgroundRepeat: 'repeat', backgroundSize: '350px' }}></div>
            {/* Subtle depth gradient at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-brand-orange/5 to-transparent pointer-events-none z-0"></div>

            {/* MAIN SCROLLABLE AREA */}
            <div className="flex-1 overflow-y-auto relative z-10 flex flex-col no-scrollbar pb-[180px]">
              
              <div className="px-6 pt-10 sm:pt-12">
                {/* 1. EDITORIAL HEADER */}
                <div className="flex justify-between items-start mb-10">
                  <div className="flex flex-col">
                    <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-brand-darkGreen leading-[0.9] tracking-tighter">
                      Your<br />Order
                    </h2>
                    {totalItems > 0 && (
                      <div className="flex items-center space-x-2 mt-4">
                        <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                        <span className="font-bold text-xs sm:text-sm tracking-widest uppercase text-brand-orange">
                          {totalItems} delicious {totalItems === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-3 rounded-full bg-brand-darkGreen/5 hover:bg-brand-darkGreen/15 text-brand-darkGreen transition-colors"
                    aria-label="Close cart"
                  >
                    <X size={24} strokeWidth={2.5} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  /* EMPTY CART STATE */
                  <div className="flex flex-col items-start justify-center mt-20 space-y-6">
                    <h3 className="font-display text-3xl font-black uppercase text-brand-darkGreen/40 tracking-tight">
                      Waiting for<br/>cravings...
                    </h3>
                    <p className="text-sm font-medium text-brand-darkGreen/60 max-w-[260px] leading-relaxed">
                      Your order is currently empty. Add premium smash burgers, hot pastries, or refreshing drinks to get started.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 bg-brand-darkGreen hover:bg-brand-orange text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
                    >
                      Explore Menu →
                    </button>
                  </div>
                ) : (
                  <>
                    {/* 2. FULFILLMENT SELECTOR (Editorial Tabs) */}
                    <div className="flex space-x-8 border-b border-brand-darkGreen/10 mb-8">
                      <button
                        onClick={() => setFulfillmentType('delivery')}
                        className={`pb-4 font-black text-sm uppercase tracking-wider relative transition-colors ${
                          fulfillmentType === 'delivery'
                            ? 'text-brand-darkGreen'
                            : 'text-brand-darkGreen/30 hover:text-brand-darkGreen/60'
                        }`}
                      >
                        Delivery
                        {fulfillmentType === 'delivery' && (
                          <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-orange rounded-t-full" />
                        )}
                      </button>
                      <button
                        onClick={() => setFulfillmentType('pickup')}
                        className={`pb-4 font-black text-sm uppercase tracking-wider relative transition-colors ${
                          fulfillmentType === 'pickup'
                            ? 'text-brand-darkGreen'
                            : 'text-brand-darkGreen/30 hover:text-brand-darkGreen/60'
                        }`}
                      >
                        Pickup
                        {fulfillmentType === 'pickup' && (
                          <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-orange rounded-t-full" />
                        )}
                      </button>
                    </div>

                    {/* 3. ORDER ITEMS LIST (No Cards, Editorial Rows) */}
                    <div className="space-y-0">
                      <AnimatePresence initial={false}>
                        {cart.map((item, index) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                            className="relative flex flex-col"
                          >
                            <div className="flex gap-4 sm:gap-5 py-6">
                              {/* PRODUCT IMAGE */}
                              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-brand-darkGreen/5 shadow-sm">
                                <Image
                                  src={item.menuItem.image}
                                  alt={item.menuItem.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              {/* PRODUCT INFO */}
                              <div className="flex-1 min-w-0 flex flex-col pt-1">
                                <div className="flex justify-between items-start">
                                  <div className="pr-2">
                                    <h4 className="font-bold text-base sm:text-lg text-brand-darkGreen leading-tight">
                                      {item.menuItem.name}
                                    </h4>
                                    {item.selectedAddons.length > 0 && (
                                      <p className="text-[11px] sm:text-xs font-semibold text-brand-darkGreen/40 mt-1 line-clamp-1 uppercase tracking-wide">
                                        + {item.selectedAddons.map((a) => a.name).join(', ')}
                                      </p>
                                    )}
                                  </div>
                                  {/* SUBTLE REMOVE BUTTON */}
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-brand-darkGreen/20 hover:text-brand-orange p-1 -mt-1 -mr-2 transition-colors"
                                    aria-label="Remove item"
                                  >
                                    <X size={20} strokeWidth={2.5} />
                                  </button>
                                </div>
                                
                                <div className="mt-auto flex items-end justify-between pb-1">
                                  {/* PRICE */}
                                  <div className="font-black text-lg sm:text-xl text-brand-darkGreen">
                                    ₦{item.totalPrice.toLocaleString()}
                                  </div>

                                  {/* 4. INTEGRATED QUANTITY CONTROL */}
                                  <div className="flex items-center space-x-3 bg-white/60 rounded-full px-2 py-1 shadow-sm border border-brand-darkGreen/5">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="w-7 h-7 flex items-center justify-center text-brand-darkGreen/60 hover:text-brand-orange hover:bg-brand-orange/10 rounded-full transition-colors"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus size={14} strokeWidth={3} />
                                    </button>
                                    <span className="text-sm font-black w-3 text-center text-brand-darkGreen">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="w-7 h-7 flex items-center justify-center text-brand-darkGreen/60 hover:text-brand-orange hover:bg-brand-orange/10 rounded-full transition-colors"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus size={14} strokeWidth={3} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* DIVIDER */}
                            {index !== cart.length - 1 && (
                              <div className="w-full h-px bg-brand-darkGreen/10"></div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* 5. ORDER SUMMARY & PROMO AREA */}
                    <div className="mt-10 mb-6">
                      
                      {/* 6. PROMO CODE (Minimalist) */}
                      <div className="bg-brand-darkGreen/5 rounded-[20px] p-5 mb-8 border border-brand-darkGreen/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-darkGreen/40 mb-3">
                          Have a promo code?
                        </p>
                        {appliedPromo ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-brand-orange">
                              <Tag size={16} strokeWidth={2.5} />
                              <span className="text-sm font-bold uppercase tracking-wide">'{appliedPromo.code}' APPLIED</span>
                            </div>
                            <button
                              onClick={removePromoCode}
                              className="text-brand-darkGreen/40 hover:text-red-500 font-bold text-[10px] uppercase tracking-widest transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleApplyPromo} className="flex border-b-2 border-brand-darkGreen/10 focus-within:border-brand-orange transition-colors">
                            <input
                              type="text"
                              placeholder="ENTER CODE..."
                              value={promoInput}
                              onChange={(e) => setPromoInput(e.target.value)}
                              className="flex-1 bg-transparent py-2 text-sm sm:text-base font-black text-brand-darkGreen placeholder-brand-darkGreen/20 focus:outline-none uppercase"
                            />
                            <button
                              type="submit"
                              className="text-brand-darkGreen hover:text-brand-orange font-black text-xs uppercase tracking-widest px-2 transition-colors"
                            >
                              Apply
                            </button>
                          </form>
                        )}
                        {promoError && <p className="text-[10px] text-red-500 font-bold mt-2 uppercase tracking-wide">{promoError}</p>}
                        {promoSuccess && <p className="text-[10px] text-brand-orange font-bold mt-2 uppercase tracking-wide">{promoSuccess}</p>}
                      </div>

                      {/* 7. REAL ORDER SUMMARY HIERARCHY */}
                      <div className="space-y-4 px-2">
                        <div className="flex justify-between text-sm font-bold text-brand-darkGreen/60">
                          <span className="uppercase tracking-widest">Subtotal</span>
                          <span>₦{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-brand-darkGreen/60">
                          <span className="uppercase tracking-widest">Delivery Fee</span>
                          <span>{deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-sm font-bold text-brand-orange">
                            <span className="uppercase tracking-widest">Discount</span>
                            <span>-₦{discount.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 8. FIXED CHECKOUT CTA (The Climax) */}
            {cart.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-brand-parchment/95 backdrop-blur-xl border-t border-brand-darkGreen/10 px-6 py-6 pb-8 z-20 shadow-[0_-10px_40px_rgba(6,45,38,0.05)]">
                
                <div className="flex justify-between items-end mb-5 px-1">
                  <span className="text-xs font-black uppercase tracking-widest text-brand-darkGreen/50 pb-1">Total Amount</span>
                  <span className="text-4xl sm:text-5xl font-display font-black text-brand-orange leading-none">
                    ₦{total.toLocaleString()}
                  </span>
                </div>

                <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-darkGreen hover:bg-brand-orange text-white py-5 rounded-[20px] font-black text-sm sm:text-base uppercase tracking-widest flex items-center justify-center space-x-3 shadow-xl transition-all"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
