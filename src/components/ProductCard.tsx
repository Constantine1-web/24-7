'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Flame, Clock } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  item: MenuItem;
}

export default function ProductCard({ item }: ProductCardProps) {
  const { setSelectedItemForModal, addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.allowedAddons && item.allowedAddons.length > 0) {
      // If item has customizable add-ons, open modal
      setSelectedItemForModal(item);
    } else {
      // Direct add to cart
      addToCart(item, 1);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={() => setSelectedItemForModal(item)}
      className="bg-brand-creamCard rounded-3xl p-5 border border-brand-parchmentDark shadow-brand hover:shadow-card-elevated transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-4 bg-white/50">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge Pill */}
        {item.badge && (
          <div className="absolute top-3 left-3 bg-brand-orange text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider">
            {item.badge}
          </div>
        )}

        {/* Spicy Indicator */}
        {item.spicy && (
          <div className="absolute top-3 right-3 bg-red-600 text-white p-1.5 rounded-full shadow-md">
            <Flame size={14} className="fill-white" />
          </div>
        )}

        {/* Prep Time Tag */}
        <div className="absolute bottom-3 left-3 bg-brand-darkGreen/80 backdrop-blur-md text-brand-yellow text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
          <Clock size={11} />
          <span>{item.prepTime}</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="space-y-2 flex-grow">
        <h3 className="font-display text-xl uppercase tracking-tight text-brand-darkGreen group-hover:text-brand-orange transition-colors">
          {item.name}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Bottom Controls Bar */}
      <div className="flex items-center justify-between pt-4 mt-3 border-t border-brand-parchmentDark">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase text-gray-500">PRICE</span>
          <span className="font-extrabold text-lg text-brand-orange">
            ₦{item.price.toLocaleString()}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleQuickAdd}
          className="bg-brand-green hover:bg-brand-orange text-white p-3 rounded-2xl shadow-md transition-colors flex items-center space-x-1 font-bold text-xs"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">ADD</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
