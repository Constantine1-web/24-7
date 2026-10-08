'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { MENU_ITEMS } from '@/data/menuData';
import { CategoryId } from '@/types';
import { Search, Flame, Filter, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySpicy, setOnlySpicy] = useState(false);

  // New fast-food oriented categories replacing the old traditional focus
  const categories = [
    { id: 'all', label: 'ALL DISHES' },
    { id: 'burgers', label: 'SMASH BURGERS' },
    { id: 'pastries', label: 'PASTRIES & BAKES' },
    { id: 'fries', label: 'LOADED FRIES' },
    { id: 'chicken', label: 'CHICKEN & WINGS' },
    { id: 'pizza', label: 'PIZZA' },
    { id: 'mains', label: 'HEARTY MAINS' },
    { id: 'drinks', label: 'DRINKS' },
    { id: 'desserts', label: 'DESSERTS' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Dynamic category mapping based on the actual items to match new labels
      let itemCat = item.category;
      
      // Map products to the newly positioned fast-casual categories without modifying underlying data shape
      if (item.name.toLowerCase().includes('pie') || item.name.toLowerCase().includes('puff') || item.name.toLowerCase().includes('chin chin')) {
        itemCat = 'pastries';
      } else if (item.name.toLowerCase().includes('fries')) {
        itemCat = 'fries';
      } else if (item.name.toLowerCase().includes('shawarma')) {
        itemCat = 'burgers'; // Group wraps with burgers for this UI view
      }

      if (selectedCategory !== 'all' && itemCat !== selectedCategory) {
        return false;
      }
      if (onlySpicy && !item.spicy) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
      }
      return true;
    });
  }, [selectedCategory, searchQuery, onlySpicy]);

  return (
    <div className="min-h-screen flex flex-col text-brand-darkGreen overflow-x-hidden">
      
      {/* 
        PREMIUM HERO SECTION 
        Responsive layout: Stacks on mobile, splits dynamically on tablet/desktop. 
        Uses absolute layered imagery for an editorial/advertising feel.
      */}
      <div className="relative bg-brand-green text-brand-parchment pt-8 pb-12 lg:pt-16 lg:pb-20 px-4 sm:px-6 lg:px-8 border-b border-brand-lightGreen/30 overflow-hidden">
        
        {/* Floating Background Textures (Hidden on mobile to prevent clutter) */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen hidden md:block" style={{ backgroundImage: "url('/images/food-doodles-core.png')", backgroundRepeat: 'repeat', backgroundSize: '300px', filter: 'invert(1)' }}></div>
        <div className="absolute top-[-5%] left-[-5%] w-[300px] h-[300px] opacity-[0.05] pointer-events-none hidden md:block transform -rotate-12">
          <Image src="/images/food-doodles-core.png" alt="" fill className="object-cover filter invert" />
        </div>
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] opacity-[0.05] pointer-events-none hidden lg:block">
           <Image src="/images/food-doodles-core.png" alt="" fill className="object-cover filter invert" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Left: Typography & Controls */}
            <div className="flex-1 w-full max-w-2xl text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5 shadow-sm"
              >
                <span>24/7 Flavours Menu</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] uppercase tracking-tight text-white leading-[0.95] mb-5"
              >
                EXPLORE <span className="text-brand-orange block mt-1">THE KITCHEN</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed mb-8"
              >
                Freshly prepared smash burgers, loaded fries, golden pastries, crispy chicken, and ice-cold craft beverages. Made to order, just for you.
              </motion.p>

              {/* Refined Search & Filter Controls */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl mx-auto lg:mx-0"
              >
                <div className="relative flex-1 w-full group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400 group-focus-within:text-brand-yellow transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search burgers, fries, pizza..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 backdrop-blur-md text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-brand-yellow focus:bg-white/10 transition-all font-medium placeholder-gray-400 shadow-inner text-sm sm:text-base"
                  />
                </div>

                <button
                  onClick={() => setOnlySpicy(!onlySpicy)}
                  className={`w-full sm:w-auto px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-wide flex items-center justify-center space-x-2 transition-all shadow-lg ${
                    onlySpicy
                      ? 'bg-[#bd3c0d] text-white border-2 border-[#bd3c0d] shadow-red-900/50'
                      : 'bg-white/5 text-white border-2 border-white/10 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <Flame size={18} className={onlySpicy ? 'fill-white animate-pulse' : 'text-gray-400'} />
                  <span>{onlySpicy ? 'SPICY: ON' : 'SPICY ONLY'}</span>
                </button>
              </motion.div>
            </div>

            {/* Right: Editorial Food Composition */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex-1 w-full relative h-[280px] sm:h-[350px] lg:h-[420px] flex items-center justify-center mt-6 lg:mt-0"
            >
              {/* Soft spotlight behind the food */}
              <div className="absolute inset-0 bg-brand-yellow/15 rounded-full blur-[80px] transform scale-90 mix-blend-screen"></div>
              
              {/* Primary Subject (Burger/Combo) */}
              <div className="relative w-[110%] sm:w-[100%] h-full z-20 hover:scale-105 transition-transform duration-700">
                <Image 
                  src="/images/hero-promo.png" 
                  alt="Premium Smash Burger Combo" 
                  fill 
                  priority
                  className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]" 
                />
              </div>

              {/* Floating secondary element - Pizza slice */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -right-2 sm:-right-6 top-8 sm:top-10 w-24 h-24 sm:w-36 sm:h-36 z-10 rotate-12 drop-shadow-2xl opacity-90 hidden sm:block"
              >
                <Image src="/images/pepperoni-pizza-slice.png" alt="Pizza slice" fill className="object-contain" />
              </motion.div>

              {/* Floating secondary element - Shawarma / Fries */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -left-2 sm:left-0 bottom-4 w-28 h-28 sm:w-40 sm:h-40 z-30 -rotate-12 drop-shadow-2xl hidden sm:block"
              >
                <Image src="/images/crispy-yam-fries.png" alt="Crispy Yam Fries" fill className="object-contain" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 
        CATEGORY NAVIGATION
        Sticky, horizontally scrollable, premium pills.
        Smooth gradient masks on edges indicate scrollability on mobile.
      */}
      <div className="sticky top-[64px] lg:top-20 z-40 bg-brand-parchment/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto relative">
          {/* Scroll fade masks for mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-6 bg-gradient-to-r from-brand-parchment to-transparent z-10 pointer-events-none lg:hidden"></div>
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-brand-parchment to-transparent z-10 pointer-events-none lg:hidden"></div>
          
          <div className="flex space-x-2 sm:space-x-3 overflow-x-auto no-scrollbar py-3 sm:py-4 px-4 sm:px-6 lg:px-8 items-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-[10px] sm:text-[11px] md:text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 border-2 ${
                  selectedCategory === cat.id
                    ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/30 scale-[1.02] sm:scale-105'
                    : 'bg-white text-brand-darkGreen border-gray-200 hover:border-brand-orange/50 hover:bg-orange-50/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-16 flex-grow">
        
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl uppercase text-brand-darkGreen tracking-tight">
              {selectedCategory === 'all' 
                ? 'Full Menu' 
                : categories.find(c => c.id === selectedCategory)?.label}
            </h2>
            <p className="text-gray-500 font-medium mt-1 text-sm sm:text-base">
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center self-start sm:self-auto text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-[#bd3c0d] transition-colors bg-brand-orange/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
            >
              <span>View All</span>
              <ChevronRight size={14} className="ml-1" />
            </button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 sm:py-24 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm px-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Filter size={28} className="text-gray-400 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl uppercase text-brand-darkGreen mb-2">
              NO CRAVINGS FOUND
            </h3>
            <p className="text-gray-500 font-medium max-w-md mx-auto text-sm sm:text-base">
              We couldn't find any dishes matching your current filters. Try adjusting your search or category.
            </p>
            <button
               onClick={() => {
                 setSearchQuery('');
                 setOnlySpicy(false);
                 setSelectedCategory('all');
               }}
               className="mt-6 font-bold text-brand-orange uppercase tracking-wider text-xs sm:text-sm hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
