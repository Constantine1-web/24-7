'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="page-shell">
      {/* Main Hero Section */}
      <section className="hero" aria-labelledby="hero-title">
        
        {/* Left Hero Copy */}
        <div className="hero-copy relative z-10">
          <p className="eyebrow font-[850]">UYO’S #1 FAST-CASUAL SPOT</p>
          
          <h1 id="hero-title" className="flex flex-col">
            <span>Cravings</span>
            <span>don’t clock out.</span>
            <span className="accent">Neither do we.</span>
          </h1>

          <p className="hero-description text-lg font-medium text-[#2d3834] max-w-lg mb-6">
            Fresh burgers, Suya wings, parfaits and ice-cold Zobo, made daily in Uyo.
          </p>

          <div className="hero-actions mb-6">
            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-4">
                <Link className="button button-primary" href="/menu">
                  <span>Order now</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>

                <a className="button button-secondary" href="#snack-carousel">
                  Quick bites
                </a>
              </div>
              <span className="text-xs font-bold text-[#676a67] ml-2">Delivery & pickup available</span>
            </div>
          </div>

          {/* Trust Row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-semibold text-[#676a67]">
            <div className="flex text-[#ffbd3e] tracking-widest text-base sm:text-lg">
              ★★★★★
            </div>
            <span className="text-[#062d26] font-extrabold ml-0.5 sm:ml-1">4.9</span>
            <span className="opacity-50 hidden sm:inline">·</span>
            <span className="opacity-50 sm:hidden">|</span>
            <span>30 min delivery</span>
            <span className="opacity-50 hidden sm:inline">·</span>
            <span className="opacity-50 sm:hidden">|</span>
            <span>Fresh daily</span>
          </div>
        </div>

        {/* Right Hero Art Promo Graphic */}
        <div className="hero-art relative z-10 flex items-center justify-center mt-12 md:mt-0 lg:-ml-12" aria-label="30 percent off burger, fries and drink promotion">
          
          {/* Subtle warm glow behind the food */}
          <div className="absolute inset-0 bg-[#ffbd3e]/15 rounded-full blur-[80px] transform scale-110 -z-10 mix-blend-multiply"></div>

          {/* 30% OFF Integrated Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-6 lg:-top-10 right-2 lg:right-auto lg:left-4 z-20 flex flex-col items-center scale-75 md:scale-90 lg:scale-100 origin-top-right lg:origin-top-left"
          >
            <div className="bg-[#bd3c0d] text-white font-black text-3xl px-5 py-2 rounded-xl shadow-2xl border-4 border-white">
              30% OFF
            </div>
            <div className="text-[#bd3c0d] font-black text-2xl -mt-2 drop-shadow-md">↓</div>
            <div className="bg-white/95 backdrop-blur-sm text-[#062d26] text-[9px] font-black tracking-widest px-3 py-1.5 rounded-full mt-1 shadow-lg uppercase border border-gray-100">
              Today Only • Selected Combos
            </div>
          </motion.div>

          {/* Main Hero Image */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[700px] aspect-[4/3] z-10"
          >
            <Image
              src="/images/hero-promo.png"
              alt="Hero meal deal with a burger, fries and iced drink"
              fill
              priority
              className="object-contain filter drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
            />
          </motion.div>

          {/* Floating Delivery Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 lg:bottom-8 right-2 md:-right-8 z-20 bg-white rounded-2xl p-2 lg:p-3 pr-4 lg:pr-5 shadow-2xl border border-gray-100 flex items-center gap-2 lg:gap-3 scale-75 md:scale-90 lg:scale-100 origin-bottom-right"
          >
            <div className="w-11 h-11 rounded-full bg-[#ffbd3e]/20 flex items-center justify-center text-xl shadow-inner">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="font-black text-[#062d26] text-sm uppercase tracking-wide leading-none mb-1">Fast Delivery</span>
              <span className="font-bold text-[#bd3c0d] text-[11px] uppercase tracking-wider leading-none">Under 30 mins</span>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Peeking Next Section (Replaces the old trust-bar) */}
      <section className="mt-8 pt-8 border-t border-gray-200/50 relative overflow-hidden" aria-label="Popular right now preview">
        <div className="flex items-center justify-between mb-5 px-2">
          <h3 className="font-display font-bold text-lg uppercase tracking-wider text-[#062d26]">Popular right now</h3>
          <Link href="/menu" className="text-xs font-bold text-[#bd3c0d] uppercase hover:underline">View menu →</Link>
        </div>
        {/* We fix the height here so it intentionally cuts off and "peeks" to tempt scrolling */}
        <div 
          className="flex gap-4 overflow-hidden h-[130px] px-2"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
        >
          {[
            { id: 1, name: 'Loaded Beef Shawarma', image: '/images/loaded-shawarma.png' },
            { id: 2, name: 'Pepperoni Pizza Slice', image: '/images/pepperoni-pizza-slice.png' },
            { id: 3, name: 'Spicy Suya Wings', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80' }
          ].map(item => (
            <div key={item.id} className="min-w-[220px] w-[220px] bg-white/80 rounded-t-2xl shadow-sm border border-gray-100 p-3 flex flex-col gap-3">
              <div className="w-full h-[70px] bg-gray-100 rounded-xl relative overflow-hidden flex-shrink-0">
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
