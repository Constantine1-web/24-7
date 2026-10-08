'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, Tag, Bike, Store, ShoppingBag } from 'lucide-react';
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
          className="absolute inset-0 bg-brand-darkGreen/40 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="w-screen max-w-[420px] bg-brand-parchment shadow-2xl flex flex-col border-l-0 sm:border-l border-[rgba(6,45,38,0.1)] relative"
          >
            {/* Subtle Brand Doodle Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply z-0" style={{ backgroundImage: "url('/images/food-doodles-core.png')", backgroundRepeat: 'repeat', backgroundSize: '300px' }}></div>

            {/* 1. CART HEADER */}
            <div className="px-6 py-5 bg-brand-darkGreen text-white flex items-center justify-between relative z-10 shadow-md">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <ShoppingBag size={18} className="text-brand-orange" strokeWidth={2.5} />
                  <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-none mt-1">YOUR CART</h2>
                </div>
                {totalItems > 0 && (
                  <span className="text-[10px] font-extrabold text-brand-yellow tracking-widest mt-1">
                    {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* 2. DELIVERY / PICKUP SELECTOR */}
            {cart.length > 0 && (
              <div className="px-5 py-4 bg-white/50 backdrop-blur-sm border-b border-[rgba(6,45,38,0.06)] relative z-10">
                <div className="bg-[rgba(6,45,38,0.04)] p-1.5 rounded-[16px] flex relative shadow-inner">
                  <button
                    onClick={() => setFulfillmentType('delivery')}
                    className={`flex-1 py-2.5 px-2 rounded-[12px] font-bold text-[11px] sm:text-xs flex items-center justify-center space-x-2 transition-all z-10 ${
                      fulfillmentType === 'delivery'
                        ? 'bg-brand-darkGreen text-white shadow-md transform scale-[1.02]'
                        : 'text-brand-darkGreen/60 hover:text-brand-darkGreen'
                    }`}
                  >
                    <Bike size={16} strokeWidth={2.5} />
                    <span className="uppercase tracking-wide">Delivery (Uyo)</span>
                  </button>
                  <button
                    onClick={() => setFulfillmentType('pickup')}
                    className={`flex-1 py-2.5 px-2 rounded-[12px] font-bold text-[11px] sm:text-xs flex items-center justify-center space-x-2 transition-all z-10 ${
                      fulfillmentType === 'pickup'
                        ? 'bg-brand-darkGreen text-white shadow-md transform scale-[1.02]'
                        : 'text-brand-darkGreen/60 hover:text-brand-darkGreen'
                    }`}
                  >
                    <Store size={16} strokeWidth={2.5} />
                    <span className="uppercase tracking-wide">Pickup (Ikpa Rd)</span>
                  </button>
                </div>
              </div>
            )}

            {/* MAIN SCROLLABLE AREA (Products + Summary) */}
            <div className="flex-1 overflow-y-auto relative z-10 flex flex-col no-scrollbar">
              
              {/* Items List */}
              <div className="px-5 py-6 flex-1">
                {cart.length === 0 ? (
                  /* 12. EMPTY CART STATE */
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-5 px-4 mt-12">
                    <div className="w-24 h-24 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto text-brand-orange relative">
                      <div className="absolute inset-0 bg-brand-yellow/20 rounded-full filter blur-xl"></div>
                      <ShoppingBag size={40} strokeWidth={1.5} className="relative z-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-black uppercase text-brand-darkGreen tracking-tight">
                        Cravings on hold
                      </h3>
                      <p className="text-sm font-medium text-brand-darkGreen/60 max-w-[240px] mx-auto leading-relaxed">
                        Your cart is waiting. Fill it with premium smash burgers, hot pastries, or iced drinks.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 bg-brand-darkGreen hover:bg-brand-orange text-white px-8 py-3.5 rounded-[14px] font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95"
                    >
                      Explore Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence initial={false}>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                          className="relative p-3 sm:p-4 rounded-[20px] bg-white border border-[rgba(6,45,38,0.06)] shadow-[0_4px_20px_-4px_rgba(6,45,38,0.03)] flex items-start gap-4"
                        >
                          {/* 5. REMOVE BUTTON (Top Right, Subtle) */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="absolute top-3 right-3 text-brand-darkGreen/30 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors z-10"
                            aria-label="Remove item"
                          >
                            <X size={16} strokeWidth={3} />
                          </button>

                          {/* 3. PRODUCT IMAGE */}
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[14px] overflow-hidden flex-shrink-0 bg-[#F4F4F4]">
                            <Image
                              src={item.menuItem.image}
                              alt={item.menuItem.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* PRODUCT DETAILS & QUANTITY */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between h-full pt-0.5">
                            <div className="pr-6">
                              <h4 className="font-bold text-[13px] sm:text-sm text-brand-darkGreen leading-tight line-clamp-2">
                                {item.menuItem.name}
                              </h4>
                              {item.selectedAddons.length > 0 && (
                                <p className="text-[10px] sm:text-[11px] font-medium text-brand-darkGreen/50 mt-1 line-clamp-1">
                                  + {item.selectedAddons.map((a) => a.name).join(', ')}
                                </p>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="font-black text-sm sm:text-base text-brand-orange">
                                ₦{item.totalPrice.toLocaleString()}
                              </div>

                              {/* 4. QUANTITY CONTROL */}
                              <div className="flex items-center bg-[rgba(6,45,38,0.03)] rounded-full p-1 border border-[rgba(6,45,38,0.05)]">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center text-brand-darkGreen shadow-sm transition-colors active:scale-95"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={14} strokeWidth={2.5} />
                                </button>
                                <span className="text-xs sm:text-sm font-black w-6 text-center text-brand-darkGreen">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center text-brand-darkGreen shadow-sm transition-colors active:scale-95"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={14} strokeWidth={2.5} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* 6. ORDER SUMMARY FLOWS NATURALLY AFTER PRODUCTS */}
              {cart.length > 0 && (
                <div className="px-5 pb-8 pt-4">
                  <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-[rgba(6,45,38,0.06)] shadow-[0_8px_30px_-12px_rgba(6,45,38,0.08)]">
                    
                    {/* 8. PROMO CODE */}
                    <div className="mb-5 border-b border-[rgba(6,45,38,0.06)] pb-5">
                      {appliedPromo ? (
                        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-[14px]">
                          <div className="flex items-center space-x-2 text-emerald-700">
                            <Tag size={16} strokeWidth={2.5} />
                            <span className="text-xs font-bold uppercase tracking-wide">'{appliedPromo.code}' APPLIED</span>
                          </div>
                          <button
                            onClick={removePromoCode}
                            className="text-emerald-700/60 hover:text-red-600 font-bold text-[10px] uppercase tracking-wider transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleApplyPromo} className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="PROMO CODE"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            className="flex-1 bg-[rgba(6,45,38,0.02)] border border-[rgba(6,45,38,0.1)] rounded-[14px] px-4 py-3 text-xs sm:text-sm font-bold text-brand-darkGreen placeholder-brand-darkGreen/30 focus:outline-none focus:border-brand-orange focus:bg-white transition-all uppercase"
                          />
                          <button
                            type="submit"
                            className="bg-brand-darkGreen text-white px-5 py-3 rounded-[14px] text-xs font-black uppercase tracking-widest hover:bg-brand-orange transition-colors active:scale-95"
                          >
                            Apply
                          </button>
                        </form>
                      )}
                      {promoError && <p className="text-[10px] text-red-500 font-bold mt-2 uppercase tracking-wide px-1">{promoError}</p>}
                      {promoSuccess && <p className="text-[10px] text-emerald-600 font-bold mt-2 uppercase tracking-wide px-1">{promoSuccess}</p>}
                    </div>

                    {/* 9. ORDER SUMMARY */}
                    <div className="space-y-3 mb-2">
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-brand-darkGreen/60">
                        <span className="uppercase tracking-wide">Subtotal</span>
                        <span>₦{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-brand-darkGreen/60">
                        <span className="uppercase tracking-wide">Delivery ({fulfillmentType === 'pickup' ? 'Pickup' : 'Uyo'})</span>
                        <span>{deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-xs sm:text-sm font-bold text-emerald-600">
                          <span className="uppercase tracking-wide">Discount</span>
                          <span>-₦{discount.toLocaleString()}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-end pt-4 mt-2 border-t border-[rgba(6,45,38,0.06)]">
                        <span className="text-sm font-black uppercase tracking-wider text-brand-darkGreen pb-1">Total</span>
                        <span className="text-3xl font-display font-black text-brand-orange leading-none">
                          ₦{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 10. FIXED CHECKOUT CTA (Anchored to absolute bottom) */}
            {cart.length > 0 && (
              <div className="p-5 sm:p-6 bg-brand-parchment/95 backdrop-blur-xl border-t border-[rgba(6,45,38,0.06)] relative z-20 shadow-[0_-4px_24px_rgba(6,45,38,0.04)]">
                {/* 11. CONTEXT CUE */}
                <div className="text-center mb-3">
                  <span className="text-[11px] font-bold text-brand-darkGreen/60 uppercase tracking-widest">
                    You're almost there! 🍔
                  </span>
                </div>
                <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="block">
                  <motion.button
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-orange hover:bg-[#a93209] text-white py-4 sm:py-5 rounded-[18px] font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center space-x-3 shadow-[0_8px_24px_-8px_rgba(189,60,13,0.6)] transition-all"
                  >
                    <span>Proceed to Checkout</span>
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
