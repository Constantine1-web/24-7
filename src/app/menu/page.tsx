'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { MENU_ITEMS } from '@/data/menuData';
import { Search, Flame } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySpicy, setOnlySpicy] = useState(false);

  // Re-architected fast-food oriented categories
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
      let itemCat = item.category;
      
      // Dynamic category mapping to match the new positioning
      if (item.name.toLowerCase().includes('pie') || item.name.toLowerCase().includes('puff') || item.name.toLowerCase().includes('chin chin')) {
        itemCat = 'pastries';
      } else if (item.name.toLowerCase().includes('fries')) {
        itemCat = 'fries';
      } else if (item.name.toLowerCase().includes('shawarma')) {
        itemCat = 'burgers'; 
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
    <div className="min-h-screen flex flex-col text-brand-darkGreen overflow-x-hidden relative">
      
      {/* 
        =========================================
        THE NEW EDITORIAL CRAVING HERO
        =========================================
      */}
      <div className="relative pt-12 pb-8 sm:pt-20 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-10 bg-brand-parchment">
        
        {/* Subtle Depth & Doodle Background Layer */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply z-0" style={{ backgroundImage: "url('/images/food-doodles-core.png')", backgroundRepeat: 'repeat', backgroundSize: '350px' }}></div>
        {/* Abstract Depth Rings */}
        <div className="absolute -left-[10%] top-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] border-[1px] border-brand-darkGreen/5 rounded-full pointer-events-none"></div>
        <div className="absolute right-[-5%] top-[20%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] border-[1px] border-brand-orange/5 rounded-full pointer-events-none"></div>
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          
          {/* 1. HEADLINE: WHAT ARE YOU CRAVING? */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-display text-[12vw] sm:text-[6rem] lg:text-[8rem] uppercase tracking-tighter leading-[0.85] text-brand-darkGreen">
              What are you
              <br />
              <span className="text-brand-orange">Craving?</span>
            </h1>
          </motion.div>

          {/* 2. THE FOOD COMPOSITION (Plates on a table / Cohesive Cluster) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[900px] h-[320px] sm:h-[450px] lg:h-[550px] mt-8 sm:mt-12 mb-10 mx-auto"
          >
            {/* The layout simulates a feast clustered on a table. Circles = plates/bowls. */}
            
            {/* Center Dominant: Burger */}
            <div className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] sm:-translate-y-1/2 w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] rounded-full border-[6px] sm:border-[8px] border-white shadow-[0_20px_50px_-12px_rgba(6,45,38,0.25)] overflow-hidden transition-transform duration-700 hover:scale-[1.02]">
              <Image src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" alt="Smash Burger" fill className="object-cover" />
            </div>

            {/* Top Left: Crispy Chicken / Wings */}
            <div className="absolute z-20 left-[5%] sm:left-[12%] lg:left-[15%] top-[10%] sm:top-[12%] w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px] rounded-full border-[4px] sm:border-[6px] border-white shadow-[0_15px_35px_-10px_rgba(6,45,38,0.2)] overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80" alt="Crispy Chicken" fill className="object-cover" />
            </div>

            {/* Bottom Right: Loaded Fries */}
            <div className="absolute z-20 right-[5%] sm:right-[10%] lg:right-[15%] bottom-[15%] sm:bottom-[10%] lg:bottom-[8%] w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] lg:w-[260px] lg:h-[260px] rounded-full border-[4px] sm:border-[6px] border-white shadow-[0_15px_40px_-10px_rgba(6,45,38,0.2)] overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80" alt="Loaded Fries" fill className="object-cover" />
            </div>

            {/* Bottom Left: Pastry / Dessert */}
            <div className="absolute z-10 left-[12%] sm:left-[22%] lg:left-[25%] bottom-[5%] sm:bottom-0 w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] lg:w-[190px] lg:h-[190px] rounded-full border-[4px] border-white shadow-[0_10px_30px_-10px_rgba(6,45,38,0.15)] overflow-hidden">
              <Image src="/images/puff-puff.png" alt="Fresh Pastries" fill className="object-cover" />
            </div>

            {/* Top Right: Refreshing Drink */}
            <div className="absolute z-10 right-[15%] sm:right-[22%] lg:right-[26%] top-[5%] sm:top-0 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[180px] lg:h-[180px] rounded-full border-[4px] border-white shadow-[0_10px_30px_-10px_rgba(6,45,38,0.15)] overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80" alt="Cold Drink" fill className="object-cover" />
            </div>
          </motion.div>

          {/* 3. CATEGORY NAVIGATION (Pick Your Craving) */}
          <div className="w-full max-w-5xl mx-auto mt-4 sm:mt-8">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-brand-darkGreen/50 mb-4 sm:mb-6"
            >
              Select A Category
            </motion.h3>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-3 justify-start lg:justify-center px-2 pb-6 -mx-4 sm:mx-0 snap-x"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`snap-start shrink-0 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-brand-darkGreen text-white shadow-[0_8px_20px_-6px_rgba(6,45,38,0.4)] transform -translate-y-1'
                      : 'bg-white text-brand-darkGreen border border-brand-darkGreen/10 hover:bg-brand-orange/5 hover:border-brand-orange/30'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* 4. UTILITY: SEARCH & FILTER (Lower Hierarchy) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl mx-auto mt-2 sm:mt-6 px-2"
          >
            <div className="relative flex-1 w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-brand-darkGreen/30 group-focus-within:text-brand-orange transition-colors" strokeWidth={2.5} />
              </div>
              <input
                type="text"
                placeholder="Search burgers, pastries, pizza..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-brand-darkGreen pl-11 pr-4 py-3.5 rounded-[16px] border border-brand-darkGreen/10 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all font-bold placeholder-brand-darkGreen/30 shadow-sm text-xs sm:text-sm uppercase tracking-wide"
              />
            </div>

            <button
              onClick={() => setOnlySpicy(!onlySpicy)}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-[16px] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                onlySpicy
                  ? 'bg-red-600 text-white shadow-[0_8px_20px_-6px_rgba(220,38,38,0.4)] border border-red-600'
                  : 'bg-white text-brand-darkGreen border border-brand-darkGreen/10 hover:bg-red-50 hover:border-red-200 hover:text-red-600 shadow-sm'
              }`}
            >
              <Flame size={18} strokeWidth={2.5} className={onlySpicy ? 'fill-white animate-pulse' : 'text-current opacity-70'} />
              <span>{onlySpicy ? 'Spicy Only' : 'Spicy'}</span>
            </button>
          </motion.div>

        </div>
      </div>

      {/* 
        =========================================
        MENU PRODUCT GRID
        =========================================
      */}
      <div className="flex-1 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-20 bg-brand-parchment border-t border-brand-darkGreen/5">
        <div className="max-w-7xl mx-auto">
          
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div 
                key={selectedCategory + searchQuery + onlySpicy}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
              >
                {filteredItems.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-brand-darkGreen/10">
                  <Search size={32} className="text-brand-darkGreen/30" />
                </div>
                <h3 className="font-display text-2xl uppercase text-brand-darkGreen mb-2">No cravings found</h3>
                <p className="text-brand-darkGreen/60 text-sm max-w-sm">
                  We couldn't find any dishes matching your search. Try a different term or clear your filters.
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setOnlySpicy(false); setSelectedCategory('all'); }}
                  className="mt-8 px-6 py-3 bg-brand-darkGreen text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-brand-orange transition-colors"
                >
                  View Full Menu
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <Footer />
    </div>
  );
}
