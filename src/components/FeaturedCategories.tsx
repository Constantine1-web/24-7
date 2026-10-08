'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedCategories() {
  const categories = [
    {
      id: 'burgers',
      title: 'SMASH BURGERS',
      subtitle: 'Double patties, melted cheddar & Suya aioli.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      color: 'bg-brand-creamCard',
      accentColor: 'text-brand-orange',
      badge: 'POPULAR CHOICE',
    },
    {
      id: 'meat-pies',
      title: 'MEAT PIE',
      subtitle: 'Golden flaky pastry packed with seasoned minced beef, potatoes & carrots.',
      image: '/images/meat-pie-featured.jpg',
      color: 'bg-brand-creamCard',
      accentColor: 'text-brand-green',
      badge: 'UYO CLASSIC',
    },
    {
      id: 'smoothies',
      title: 'TROPICAL SMOOTHIE',
      subtitle: 'Creamy blended mango, strawberry, banana & ice-cold natural fruit chillers.',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
      color: 'bg-brand-creamCard',
      accentColor: 'text-brand-orange',
      badge: 'ICE COLD',
    },
  ];

  return (
    <section className="py-16 bg-brand-parchment text-brand-darkBrown relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-brand-orange uppercase bg-brand-orange/10 px-3 py-1 rounded-full">
            OUR SPECIALTIES
          </span>
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight mt-3 text-brand-darkGreen">
            CRAFTED FOR UYO FOOD LOVERS
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Every dish is made to order using fresh local ingredients, bold spices, and authentic recipes.
          </p>
        </div>

        {/* 3-Column Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className={`${cat.color} rounded-3xl p-6 border border-brand-parchmentDark shadow-brand relative group overflow-hidden flex flex-col justify-between cursor-pointer`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand-green text-white px-2.5 py-1 rounded-full">
                    {cat.badge}
                  </span>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-darkGreen shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <h3 className="font-display text-2xl uppercase text-brand-darkGreen tracking-tight group-hover:text-brand-orange transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 font-normal">
                  {cat.subtitle}
                </p>
              </div>

              {/* Isolated Food Image */}
              <div className="relative w-full h-48 mt-6 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <Link href={`/menu?category=${cat.id}`} className="absolute inset-0 z-10" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
