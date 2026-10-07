'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS } from '@/data/menuData';
import { MenuItem } from '@/types';

export default function SnackCarousel() {
  const { addToCart, setIsCartOpen } = useCart();
  
  // Filter quick bites / snacks catalog
  const snacksList = MENU_ITEMS.filter(
    (item) => item.category === 'burgers' || item.category === 'snacks' || item.category === 'drinks'
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % snacksList.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isPaused, snacksList.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % snacksList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + snacksList.length) % snacksList.length);
  };

  const currentProduct = snacksList[activeIndex];

  const handleQuickAdd = (product: MenuItem) => {
    addToCart(product, 1);
    setAddedToast(`Added ${product.name} to cart!`);
    setTimeout(() => setAddedToast(null), 2000);
  };

  return (
    <section
      id="snack-carousel"
      className="py-16 md:py-24 bg-brand-parchment text-brand-darkBrown relative overflow-hidden border-t border-b border-brand-parchmentDark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Low contrast topographic line pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#14382B_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-brand-orange/15 text-brand-orange px-3.5 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase">
            <Flame size={14} />
            <span>GRAB A BITE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-brand-darkGreen mt-3">
            SIGNATURE SNACK ATTACK
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Swipe or let the lineup auto-scroll to pick your quick craving.
          </p>
        </div>

        {/* Carousel Visual Area */}
        <div className="relative flex justify-center items-center h-[340px] sm:h-[400px]">
          
          {/* Navigation Arrow Left */}
          <button
            onClick={handlePrev}
            aria-label="Previous Snack"
            className="absolute left-2 sm:left-12 z-30 bg-white/90 hover:bg-brand-orange text-brand-darkGreen hover:text-white p-3 rounded-full shadow-lg transition-colors border border-gray-200"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Display Container */}
          <div className="relative w-full max-w-4xl h-full flex justify-center items-center overflow-visible">
            {snacksList.map((product, index) => {
              // Calculate relative offset from active card
              let offset = index - activeIndex;

              // Handle wrap-around math for smooth loop
              if (offset < -Math.floor(snacksList.length / 2)) {
                offset += snacksList.length;
              } else if (offset > Math.floor(snacksList.length / 2)) {
                offset -= snacksList.length;
              }

              const isActive = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;

              // Card animation properties based on offset position
              let xPosition = offset * 260; // Desktop horizontal gap
              if (typeof window !== 'undefined' && window.innerWidth < 640) {
                xPosition = offset * 180; // Mobile gap
              }

              const scale = isActive ? 1.05 : isAdjacent ? 0.85 : 0.7;
              const opacity = isActive ? 1 : isAdjacent ? 0.55 : 0.2;
              const zIndex = isActive ? 20 : isAdjacent ? 10 : 0;
              const rotateY = offset * -12; // Subtle 3D perspective rotation

              return (
                <motion.div
                  key={product.id}
                  animate={{
                    x: xPosition,
                    scale,
                    opacity,
                    rotateY,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 180,
                    damping: 22,
                    mass: 0.8,
                  }}
                  onClick={() => setActiveIndex(index)}
                  style={{ zIndex }}
                  className={`absolute w-[210px] sm:w-[270px] h-[280px] sm:h-[340px] rounded-3xl p-5 shadow-2xl flex flex-col justify-between cursor-pointer border-2 transition-colors ${
                    isActive
                      ? 'bg-brand-darkBrown border-brand-yellow shadow-card-elevated text-white'
                      : 'bg-[#3D2C22] border-transparent text-gray-300 hover:opacity-80'
                  }`}
                >
                  {/* Card Header Title */}
                  <div className="text-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-yellow">
                      {product.category}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl uppercase tracking-tight leading-tight mt-0.5 line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  {/* Centered Product Photo */}
                  <div className="relative w-full h-[150px] sm:h-[180px] my-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Price Tag & Active Indicator */}
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="font-extrabold text-sm sm:text-base text-brand-yellow">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {isActive ? (
                      <span className="text-[10px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded-full uppercase">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-gray-400">
                        TAP TO VIEW
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrow Right */}
          <button
            onClick={handleNext}
            aria-label="Next Snack"
            className="absolute right-2 sm:right-12 z-30 bg-white/90 hover:bg-brand-orange text-brand-darkGreen hover:text-white p-3 rounded-full shadow-lg transition-colors border border-gray-200"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Active Product Details & Quick Add Controller */}
        <AnimatePresence mode="wait">
          {currentProduct && (
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-8 bg-brand-creamCard max-w-xl mx-auto p-6 rounded-3xl border border-brand-parchmentDark shadow-brand text-center"
            >
              <h3 className="font-display text-2xl uppercase tracking-tight text-brand-darkGreen">
                {currentProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                {currentProduct.description}
              </p>

              <div className="flex items-center justify-center space-x-6 mt-4">
                <span className="font-extrabold text-2xl text-brand-orange">
                  ₦{currentProduct.price.toLocaleString()}
                </span>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAdd(currentProduct)}
                  className="bg-brand-orange hover:bg-brand-orangeHover text-white px-6 py-3 rounded-2xl font-extrabold text-sm flex items-center space-x-2 shadow-orange-glow transition-all"
                >
                  <ShoppingBag size={18} />
                  <span>ADD TO CART</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Added Toast Notification */}
        <AnimatePresence>
          {addedToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm flex items-center space-x-2 border-2 border-white"
            >
              <span>{addedToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
