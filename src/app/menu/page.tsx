'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { MENU_ITEMS } from '@/data/menuData';
import { CategoryId } from '@/types';
import { Search, Flame, Filter } from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySpicy, setOnlySpicy] = useState(false);

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'all', label: 'ALL DISHES' },
    { id: 'burgers', label: 'SMASH BURGERS' },
    { id: 'mains', label: 'MAIN MEALS & SOUPS' },
    { id: 'snacks', label: 'SNACKS & FRIES' },
    { id: 'chicken', label: 'CHICKEN & WINGS' },
    { id: 'pizza', label: 'PIZZA' },
    { id: 'drinks', label: 'DRINKS & ZOBO' },
    { id: 'desserts', label: 'DESSERTS' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Spicy filter
      if (onlySpicy && !item.spicy) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, onlySpicy]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-parchment text-brand-darkGreen">
      {/* Header Banner */}
      <div className="bg-brand-green text-brand-parchment py-12 px-4 sm:px-6 lg:px-8 border-b border-brand-lightGreen/30">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-yellow bg-brand-yellow/20 px-3 py-1 rounded-full">
            24/7 FLAVOURS MENU
          </span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white mt-3">
            EXPLORE THE FULL KITCHEN
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Freshly prepared smash burgers, Akwa Ibom Afang soup, spicy Suya wings, and craft Zobo sodas.
          </p>

          {/* Search & Spicy Toggle Bar */}
          <div className="max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search burgers, Afang soup, Suya..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-darkGreen text-white pl-11 pr-4 py-3 rounded-2xl border border-brand-lightGreen/50 focus:outline-none focus:border-brand-yellow text-sm"
              />
            </div>

            <button
              onClick={() => setOnlySpicy(!onlySpicy)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase flex items-center justify-center space-x-2 transition-colors border ${
                onlySpicy
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-brand-darkGreen text-brand-parchment border-brand-lightGreen/50 hover:bg-brand-lightGreen'
              }`}
            >
              <Flame size={16} className={onlySpicy ? 'fill-white' : ''} />
              <span>SPICY ONLY</span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Category Pill Selector */}
      <div className="sticky top-20 z-30 bg-brand-parchment/95 backdrop-blur-md py-4 border-b border-brand-parchmentDark shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-extrabold text-xs uppercase whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-orange text-white shadow-orange-glow'
                    : 'bg-brand-creamCard text-brand-darkGreen hover:bg-brand-parchmentDark border border-brand-parchmentDark'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <div className="flex justify-between items-center mb-6 text-sm font-semibold text-gray-600">
          <span>Showing {filteredItems.length} items</span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-brand-orange hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-brand-creamCard rounded-3xl p-8 border border-brand-parchmentDark">
            <Filter size={40} className="text-gray-400 mx-auto mb-3" />
            <h3 className="font-display text-2xl uppercase text-brand-darkGreen">
              NO MATCHING DISHES FOUND
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your search terms or category selection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
