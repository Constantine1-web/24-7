"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { CartItemOption } from '../types';

export default function ProductModal() {
  const { selectedItemForModal, setSelectedItemForModal, addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<CartItemOption[]>([]);
  const [instructions, setInstructions] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItemForModal) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setSelectedAddons([]);
      setInstructions('');
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItemForModal]);

  const toggleAddon = (addon: CartItemOption) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const handleAdd = () => {
    if (!selectedItemForModal) return;
    addToCart(selectedItemForModal, quantity, selectedAddons, instructions);
    setSelectedItemForModal(null);
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItemForModal(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-brand-parchment w-[min(94vw,520px)] max-h-[calc(100dvh-24px)] sm:max-h-[calc(100vh-48px)] flex flex-col rounded-3xl overflow-hidden shadow-2xl z-10 border border-brand-parchmentDark my-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItemForModal(null)}
              aria-label="Close modal"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-brand-darkGreen/80 hover:bg-brand-orange text-white p-2 rounded-full backdrop-blur-md transition-colors shadow-md"
            >
              <X size={18} />
            </button>

            {/* Product Image Header */}
            <div className="relative w-full shrink-0 h-36 sm:h-52 bg-brand-darkGreen">
              <Image
                src={selectedItemForModal.image}
                alt={selectedItemForModal.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-parchment via-transparent to-transparent opacity-90" />
            </div>

            {/* Scrollable Body Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 flex-1 overflow-y-auto no-scrollbar relative z-10">
              
              {/* Header Info */}
              <div>
                <div className="flex justify-between items-start gap-3">
                  <h2 className="font-display text-xl sm:text-2xl lg:text-3xl uppercase tracking-tight text-brand-darkGreen">
                    {selectedItemForModal.name}
                  </h2>
                  <span className="font-black text-lg sm:text-xl text-brand-orange whitespace-nowrap">
                    ₦{selectedItemForModal.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed font-medium">
                  {selectedItemForModal.description}
                </p>
              </div>

              {/* Allowed Add-ons Checkboxes */}
              {selectedItemForModal.allowedAddons && selectedItemForModal.allowedAddons.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-brand-parchmentDark">
                  <h4 className="font-extrabold text-[11px] sm:text-xs uppercase tracking-wider text-brand-darkGreen">
                    CUSTOMIZE &amp; ADD-ONS
                  </h4>
                  <div className="space-y-2">
                    {selectedItemForModal.allowedAddons.map((addon) => {
                      const isSelected = selectedAddons.some((a) => a.id === addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon)}
                          className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-brand-green/10 border-brand-green text-brand-darkGreen font-bold'
                              : 'bg-white/60 border-gray-200 text-gray-700 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <div
                              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center border flex-shrink-0 ${
                                isSelected
                                  ? 'bg-brand-green border-brand-green text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              {isSelected && <Check size={12} strokeWidth={3} />}
                            </div>
                            <span className="text-xs sm:text-sm truncate">{addon.name}</span>
                          </div>
                          <span className="text-xs font-black text-brand-orange whitespace-nowrap ml-2">
                            +₦{addon.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Instructions Input */}
              <div className="space-y-1.5 pt-2 border-t border-brand-parchmentDark">
                <label className="font-extrabold text-[11px] sm:text-xs uppercase tracking-wider text-brand-darkGreen">
                  SPECIAL INSTRUCTIONS
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra spicy, no onions, sauce on the side..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl p-2.5 sm:p-3 text-xs sm:text-sm focus:outline-none focus:border-brand-green"
                />
              </div>

            </div>

            {/* Fixed Bottom Action Bar */}
            <div className="p-3.5 sm:p-5 border-t border-brand-parchmentDark bg-brand-parchment flex items-center justify-between gap-3 shrink-0">
              {/* Quantity Controls */}
              <div className="flex items-center space-x-2 sm:space-x-3 bg-white border border-gray-200 p-1 sm:p-1.5 rounded-2xl shadow-sm flex-shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gray-100 hover:bg-brand-orange hover:text-white flex items-center justify-center font-bold text-gray-700 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="font-black text-sm sm:text-base w-5 sm:w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gray-100 hover:bg-brand-orange hover:text-white flex items-center justify-center font-bold text-gray-700 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className="bg-brand-orange hover:bg-brand-orangeHover text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-orange-glow transition-all flex-1 min-w-0"
              >
                <ShoppingBag size={16} className="flex-shrink-0" />
                <span className="truncate">
                  ADD • ₦
                  {((selectedItemForModal.price + selectedAddons.reduce((sum, a) => sum + a.price, 0)) * quantity).toLocaleString()}
                </span>
              </motion.button>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
