'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="page-shell w-full max-w-full">
      {/* Main Hero Section */}
      <section className="hero w-full max-w-full overflow-visible" aria-labelledby="hero-title">
        
        {/* Left Hero Copy */}
        <div className="hero-copy relative z-10 w-full max-w-full">
          <p className="eyebrow font-[850]">UYO'S #1 FAST-CASUAL SPOT</p>
          
          <h1 id="hero-title" className="flex flex-col">
            <span>Cravings</span>
            <span>don't clock out.</span>
            <span className="accent">Neither do we.</span>
          </h1>

          <p className="hero-description text-base sm:text-lg font-medium text-[#2d3834] max-w-lg mb-6 leading-relaxed">
            Fresh burgers, Suya wings, parfaits and ice-cold smoothies, made daily in Uyo.
          </p>

          <div className="hero-actions mb-6">
            <div className="flex flex-col items-start gap-2.5 w-full">
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <Link className="button button-primary" href="/menu">
                  <span>Order now</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>

                <a className="button button-secondary" href="#snack-carousel">
                  Quick bites
                </a>
              </div>
              <span className="text-xs font-bold text-[#676a67] ml-1">Delivery &amp; pickup available</span>
            </div>
          </div>

          {/* Trust Row */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-sm font-semibold text-[#676a67]">
            <div className="flex text-[#ffbd3e] tracking-widest text-base sm:text-lg">
              ★★★★★
            </div>
            <span className="text-[#062d26] font-extrabold ml-0.5 sm:ml-1">4.9</span>
            <span className="opacity-50">|</span>
            <span>30 min delivery</span>
            <span className="opacity-50">|</span>
            <span>Fresh daily</span>
          </div>
        </div>

        {/* Right Hero Art Promo Graphic */}
        <div className="hero-art relative z-10 flex items-center justify-center mt-6 sm:mt-10 lg:mt-0 w-full max-w-full overflow-visible" aria-label="30 percent off burger, fries and drink promotion">
          
          {/* Subtle warm glow behind the food */}
          <div className="absolute inset-0 bg-[#ffbd3e]/15 rounded-full blur-[80px] transform scale-105 -z-10 mix-blend-multiply pointer-events-none"></div>

          {/* Main Hero Image with Integrated 3D 30% OFF Artwork */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[650px] aspect-[4/3] z-10"
          >
            <Image
              src="/images/hero-promo.png"
              alt="Hero meal deal with a burger, fries and iced drink with 30 percent off promotion"
              fill
              priority
              className="object-contain filter drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
            />
          </motion.div>

          {/* Floating Delivery Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-2 sm:bottom-4 lg:bottom-6 right-2 sm:right-4 lg:right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 lg:p-3 pr-3.5 sm:pr-4 lg:pr-5 shadow-2xl border border-gray-100/80 flex items-center gap-2 lg:gap-3 scale-75 sm:scale-90 lg:scale-100 origin-bottom-right"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#ffbd3e]/20 flex items-center justify-center text-lg sm:text-xl shadow-inner flex-shrink-0 text-brand-orange">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="font-black text-[#062d26] text-xs sm:text-sm uppercase tracking-wide leading-none mb-1">Fast Delivery</span>
              <span className="font-bold text-[#bd3c0d] text-[10px] sm:text-[11px] uppercase tracking-wider leading-none">Under 30 mins</span>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Peeking Next Section (Popular right now preview) */}
      <section className="mt-8 pt-8 border-t border-gray-200/50 relative overflow-hidden w-full max-w-full" aria-label="Popular right now preview">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-wider text-[#062d26]">Popular right now</h3>
          <Link href="/menu" className="text-xs font-bold text-[#bd3c0d] uppercase hover:underline">View menu →</Link>
        </div>
        {/* Horizontal scroll on mobile with touch support */}
        <div 
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-1 snap-x"
        >
          {[
            { id: 1, name: 'Loaded Beef Shawarma', image: '/images/loaded-shawarma.png' },
            { id: 2, name: 'Pepperoni Pizza Slice', image: '/images/pepperoni-pizza-slice.png' },
            { id: 3, name: 'Spicy Suya Wings', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80' }
          ].map(item => (
            <div key={item.id} className="min-w-[190px] sm:min-w-[220px] w-[190px] sm:w-[220px] bg-white/80 rounded-2xl shadow-sm border border-gray-100 p-3 flex flex-col gap-2.5 snap-start flex-shrink-0">
              <div className="w-full h-[80px] bg-gray-100 rounded-xl relative overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="font-bold text-xs text-[#062d26] uppercase tracking-wide line-clamp-1">{item.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
