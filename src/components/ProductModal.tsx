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
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItemForModal(null)}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-brand-parchment w-[min(92vw,520px)] max-h-[calc(100vh-32px)] sm:max-h-[calc(100vh-48px)] flex flex-col rounded-3xl overflow-hidden shadow-2xl z-10 border border-brand-parchmentDark"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItemForModal(null)}
              className="absolute top-4 right-4 z-20 bg-brand-darkGreen/80 hover:bg-brand-orange text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={20} />
            </button>

            {/* Product Image Header */}
            <div className="relative w-full shrink-0 h-44 sm:h-56 bg-brand-darkGreen">
              <Image
                src={selectedItemForModal.image}
                alt={selectedItemForModal.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-parchment via-transparent to-transparent opacity-90" />
            </div>

            {/* Scrollable Body Content */}
            <div className="p-5 sm:p-6 space-y-5 flex-1 overflow-y-auto no-scrollbar relative z-10">
              
              {/* Header Info */}
              <div>
                <div className="flex justify-between items-start gap-4">
                  <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-brand-darkGreen">
                    {selectedItemForModal.name}
                  </h2>
                  <span className="font-extrabold text-xl text-brand-orange whitespace-nowrap">
                    ₦{selectedItemForModal.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {selectedItemForModal.description}
                </p>
              </div>

              {/* Allowed Add-ons Checkboxes */}
              {selectedItemForModal.allowedAddons && selectedItemForModal.allowedAddons.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-brand-parchmentDark">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-brand-darkGreen">
                    CUSTOMIZE &amp; ADD-ONS
                  </h4>
                  <div className="space-y-2">
                    {selectedItemForModal.allowedAddons.map((addon) => {
                      const isSelected = selectedAddons.some((a) => a.id === addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon)}
                          className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-brand-green/10 border-brand-green text-brand-darkGreen'
                              : 'bg-white/60 border-gray-200 text-gray-700 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                                isSelected
                                  ? 'bg-brand-green border-brand-green text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              {isSelected && <Check size={14} />}
                            </div>
                            <span className="text-xs sm:text-sm font-semibold">{addon.name}</span>
                          </div>
                          <span className="text-xs font-bold text-brand-orange">
                            +₦{addon.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Instructions Input */}
              <div className="space-y-2 pt-2 border-t border-brand-parchmentDark">
                <label className="font-extrabold text-xs uppercase tracking-wider text-brand-darkGreen">
                  SPECIAL INSTRUCTIONS
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra spicy, no onions, sauce on the side..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-brand-green"
                />
              </div>

            </div>

            {/* Fixed Bottom Action Bar */}
            <div className="p-5 sm:p-6 border-t border-brand-parchmentDark bg-brand-parchment flex items-center justify-between shrink-0">
              {/* Quantity Controls */}
              <div className="flex items-center space-x-3 bg-white border border-gray-200 p-1.5 rounded-2xl shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-brand-orange hover:text-white flex items-center justify-center font-bold text-gray-700 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="font-extrabold text-base w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-brand-orange hover:text-white flex items-center justify-center font-bold text-gray-700 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart Submit */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className="bg-brand-orange hover:bg-brand-orangeHover text-white px-5 sm:px-6 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center space-x-2 shadow-orange-glow transition-all"
              >
                <ShoppingBag size={18} />
                <span>
                  ADD <span className="hidden sm:inline">TO CART</span> • ₦
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
