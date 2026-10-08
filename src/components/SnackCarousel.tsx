'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flame, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS } from '@/data/menuData';
import { MenuItem } from '@/types';

const SNACK_ATTACK_ITEMS: MenuItem[] = [
  {
    id: 'small-chops-combo',
    name: 'Nigerian Small Chops',
    category: 'snacks',
    price: 3500,
    description: 'Crispy samosas, mini spring rolls, peppered gizzard & golden puff-puff platter.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    prepTime: '10 mins',
    calories: '480 kcal',
    popular: true,
    available: true,
  },
  {
    id: 'loaded-suya-shawarma',
    name: 'Loaded Beef & Chicken Shawarma',
    category: 'snacks',
    price: 3500,
    description: 'Double-wrapped lavash bread stuffed with juicy grilled chicken, sausage, creamy garlic mayo & crunchy cabbage.',
    image: '/images/loaded-shawarma.png',
    prepTime: '10-12 mins',
    calories: '540 kcal',
    popular: true,
    available: true,
  },
  {
    id: 'suya-chicken-wings-snack',
    name: 'Spicy Suya Chicken Wings',
    category: 'chicken',
    price: 4500,
    description: 'Char-grilled jumbo chicken wings tossed in fiery Northern Yaji spice rub.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    prepTime: '12-15 mins',
    calories: '560 kcal',
    popular: true,
    available: true,
  },
  {
    id: 'flaky-sausage-rolls',
    name: 'Flaky Golden Sausage Rolls',
    category: 'snacks',
    price: 2000,
    description: 'Warm flaky puff pastry stuffed with seasoned savory beef sausage.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    prepTime: '5-8 mins',
    calories: '380 kcal',
    popular: true,
    available: true,
  },
  {
    id: 'savory-chicken-pie',
    name: 'Golden Chicken Pies',
    category: 'snacks',
    price: 2500,
    description: 'Golden shortcrust pastry filled with tender shredded chicken, potatoes & sweet carrots.',
    image: '/images/golden-chicken-pie.jpg',
    prepTime: '8-10 mins',
    calories: '440 kcal',
    popular: true,
    available: true,
  },
  {
    id: 'pepperoni-pizza-slice-snack',
    name: 'Pepperoni Pizza Slices',
    category: 'pizza',
    price: 3500,
    description: 'Cheesy pepperoni pizza slice with spicy tomato sauce & Suya herbs.',
    image: '/images/pepperoni-pizza-slice.png',
    prepTime: '8-10 mins',
    calories: '520 kcal',
    popular: true,
    available: true,
  },
];

export default function SnackCarousel() {
  const { addToCart } = useCart();
  const snacksList = SNACK_ATTACK_ITEMS;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % snacksList.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPaused, snacksList.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % snacksList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + snacksList.length) % snacksList.length);
  };

  const handleAddActive = (product: MenuItem) => {
    addToCart(product, 1);
    setAddedToast(`Added ${product.name} to cart!`);
    setTimeout(() => setAddedToast(null), 2000);
  };

  const activeSnack = snacksList[activeIndex];

  return (
    <section
      id="snack-carousel"
      className="py-16 md:py-24 bg-[#FDF8F2] text-[#0F2C21] relative overflow-hidden border-t border-b border-gray-200/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Background Circular Peach Blob matching Image 1 */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] bg-[#FCE6D5] rounded-full filter blur-2xl pointer-events-none opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching Image 1 */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 bg-[#FCE3CF] text-[#E85D04] px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase mb-3">
            <Flame size={14} />
            <span>GRAB A BITE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#3D1E12] leading-none">
            SIGNATURE SNACK ATTACK
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-2 font-medium">
            Swipe or let the lineup auto-scroll to pick your quick craving.
          </p>
        </div>

        {/* Carousel Visual Area matching Image 1 */}
        <div className="relative flex justify-center items-center h-[380px] sm:h-[450px]">
          
          {/* Navigation Arrow Left */}
          <button
            onClick={handlePrev}
            aria-label="Previous Snack"
            className="absolute left-2 sm:left-10 z-30 bg-white/90 hover:bg-[#E85D04] text-[#3D1E12] hover:text-white p-3 rounded-full shadow-lg transition-colors border border-gray-200"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards Display Container */}
          <div className="relative w-full max-w-4xl h-full flex justify-center items-center overflow-visible">
            {snacksList.map((product, index) => {
              // Calculate relative offset from active card
              let offset = index - activeIndex;

              if (offset < -Math.floor(snacksList.length / 2)) {
                offset += snacksList.length;
              } else if (offset > Math.floor(snacksList.length / 2)) {
                offset -= snacksList.length;
              }

              const isActive = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;

              // Card spacing math
              let xPosition = offset * 250;
              if (typeof window !== 'undefined' && window.innerWidth < 640) {
                xPosition = offset * 170;
              }

              const scale = isActive ? 1.1 : isAdjacent ? 0.88 : 0.72;
              const opacity = isActive ? 1 : isAdjacent ? 0.75 : 0.3;
              const zIndex = isActive ? 20 : isAdjacent ? 10 : 0;
              const yPosition = isActive ? 15 : 0; // Active card elevated & offset down

              return (
                <motion.div
                  key={product.id}
                  animate={{
                    x: xPosition,
                    y: yPosition,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 25,
                    mass: 0.5,
                  }}
                  onClick={() => setActiveIndex(index)}
                  style={{ zIndex }}
                  className={`absolute w-[210px] sm:w-[250px] h-[310px] sm:h-[380px] rounded-[28px] p-5 shadow-xl flex flex-col justify-between cursor-pointer border transition-colors ${
                    isActive
                      ? 'bg-[#E85D04] text-white border-[#E85D04] shadow-2xl'
                      : 'bg-[#F4DDCB] text-[#3D1E12] border-transparent hover:bg-[#EED4C0]'
                  }`}
                >
                  {/* Top Centered Isolated Image */}
                  <div className="relative w-full h-[120px] sm:h-[150px] mt-1 flex justify-center items-center rounded-2xl overflow-hidden shadow-sm">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Card Title & Category matching Image 1 */}
                  <div className="text-center my-1 space-y-0.5">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest ${
                        isActive ? 'text-white/80' : 'text-[#8A4F39]'
                      }`}
                    >
                      {product.category}
                    </span>
                    <h3
                      className={`font-display text-base sm:text-lg uppercase tracking-tight leading-none line-clamp-1 ${
                        isActive ? 'text-white' : 'text-[#3D1E12]'
                      }`}
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Nutrition Specs / Price Metadata matching Image 1 */}
                  <div className="text-[10px] space-y-0.5 px-2.5 py-1.5 rounded-xl bg-black/5">
                    <div className="flex justify-between font-semibold">
                      <span className={isActive ? 'text-white/90' : 'text-[#6D4233]'}>Prep Time</span>
                      <span className={isActive ? 'text-white font-bold' : 'text-[#3D1E12] font-bold'}>
                        {product.prepTime}
                      </span>
                    </div>
                    <div className="flex justify-between font-extrabold text-xs pt-1 border-t border-black/10">
                      <span className={isActive ? 'text-white' : 'text-[#3D1E12]'}>Price</span>
                      <span className={isActive ? 'text-white' : 'text-[#E85D04]'}>
                        ₦{product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Active Card In-Card Button matching Image 1 */}
                  {isActive ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddActive(product);
                      }}
                      className="w-full bg-[#7A1C00] hover:bg-[#5C1400] text-white py-2.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center space-x-1"
                    >
                      <ShoppingBag size={14} />
                      <span>ADD TO CART</span>
                    </motion.button>
                  ) : (
                    <div className="text-center text-[10px] font-bold text-[#8A4F39] uppercase py-1">
                      TAP TO SELECT
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrow Right */}
          <button
            onClick={handleNext}
            aria-label="Next Snack"
            className="absolute right-2 sm:right-10 z-30 bg-white/90 hover:bg-[#E85D04] text-[#3D1E12] hover:text-white p-3 rounded-full shadow-lg transition-colors border border-gray-200"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Active Snack Description & Detail Card */}
        <div className="max-w-xl mx-auto mt-6 bg-[#FAF0E6] rounded-2xl p-4 sm:p-5 border border-[#F4DDCB] shadow-sm text-center">
          <h4 className="font-display text-lg uppercase text-[#3D1E12] tracking-tight">
            {activeSnack.name}
          </h4>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 font-normal">
            {activeSnack.description}
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs font-bold text-[#8A4F39]">
            <span>⏱️ {activeSnack.prepTime}</span>
            <span>🔥 {activeSnack.calories}</span>
            <span className="text-[#E85D04] font-extrabold text-sm">₦{activeSnack.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Added Toast Notification */}
        <AnimatePresence>
          {addedToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-xs uppercase flex items-center space-x-2 border-2 border-white"
            >
              <span>{addedToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
