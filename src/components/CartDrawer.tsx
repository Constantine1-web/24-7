'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Bike, Store, ShoppingBag } from 'lucide-react';
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
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-brand-parchment shadow-2xl flex flex-col justify-between border-l border-brand-parchmentDark"
          >
            {/* Header */}
            <div className="p-5 border-b border-brand-parchmentDark bg-brand-green text-brand-parchment flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={20} className="text-brand-yellow" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-white">YOUR CART</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-brand-lightGreen text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Delivery vs Pickup Toggle Bar */}
            <div className="p-4 bg-brand-creamCard border-b border-brand-parchmentDark">
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200/70 rounded-2xl">
                <button
                  onClick={() => setFulfillmentType('delivery')}
                  className={`py-2 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center space-x-2 transition-all ${
                    fulfillmentType === 'delivery'
                      ? 'bg-brand-green text-white shadow-sm'
                      : 'text-gray-700 hover:text-black'
                  }`}
                >
                  <Bike size={14} />
                  <span>DELIVERY (UYO)</span>
                </button>
                <button
                  onClick={() => setFulfillmentType('pickup')}
                  className={`py-2 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center space-x-2 transition-all ${
                    fulfillmentType === 'pickup'
                      ? 'bg-brand-green text-white shadow-sm'
                      : 'text-gray-700 hover:text-black'
                  }`}
                >
                  <Store size={14} />
                  <span>PICKUP (IKPA RD)</span>
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto text-brand-orange">
                    <ShoppingBag size={36} />
                  </div>
                  <h3 className="font-display text-xl uppercase text-brand-darkGreen">
                    YOUR CART IS EMPTY
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Looks like you haven't added any Uyo smash burgers or Afang soup yet.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase shadow-orange-glow"
                  >
                    EXPLORE MENU
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 rounded-2xl bg-white border border-gray-200 shadow-sm"
                  >
                    {/* Photo */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-brand-darkGreen truncate">
                        {item.menuItem.name}
                      </h4>
                      {item.selectedAddons.length > 0 && (
                        <p className="text-[10px] text-gray-500 truncate">
                          + {item.selectedAddons.map((a) => a.name).join(', ')}
                        </p>
                      )}
                      <div className="font-extrabold text-xs text-brand-orange mt-1">
                        ₦{item.totalPrice.toLocaleString()}
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 bg-white rounded-lg flex items-center justify-center text-xs font-bold shadow-sm"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-extrabold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 bg-white rounded-lg flex items-center justify-center text-xs font-bold shadow-sm"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo Code & Order Summary Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-brand-parchmentDark bg-brand-creamCard space-y-4">
                {/* Promo Code Input */}
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-100 border border-emerald-300 p-2.5 rounded-xl text-xs font-bold text-emerald-800">
                    <div className="flex items-center space-x-2">
                      <Tag size={14} />
                      <span>Code '{appliedPromo.code}' applied</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-red-600 hover:underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. UYO10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-brand-green uppercase"
                    />
                    <button
                      type="submit"
                      className="bg-brand-green text-white px-4 py-2 rounded-xl text-xs font-extrabold uppercase hover:bg-brand-orange transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[11px] text-red-600 font-semibold">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-600 font-semibold">{promoSuccess}</p>}

                {/* Subtotal Calculations */}
                <div className="space-y-1.5 text-xs text-gray-700 pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee ({fulfillmentType === 'pickup' ? 'Pickup' : 'Uyo'})</span>
                    <span className="font-bold">
                      {deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Promo Discount</span>
                      <span>-₦{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-brand-darkGreen pt-2 border-t border-gray-300">
                    <span>TOTAL</span>
                    <span className="text-brand-orange font-display text-xl">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Proceed to Checkout CTA */}
                <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white py-4 rounded-2xl font-extrabold text-sm uppercase flex items-center justify-center space-x-2 shadow-orange-glow transition-all"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight size={18} />
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
