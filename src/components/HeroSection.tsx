'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Bike, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-[#FDF8F2] text-brand-darkGreen overflow-hidden pt-6 pb-12 md:pt-10 md:pb-16 border-b border-brand-parchmentDark/50">
      
      {/* Light background subtle pattern watermark */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#14382B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left Copy & Right Burger/Fries/Drink Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-block">
              <span className="bg-[#FCE3CF] text-[#E85D04] px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#E85D04]" />
                <span>UYO'S #1 FAST-CASUAL SPOT</span>
              </span>
            </div>

            {/* Huge Headline matching Image 3 */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl tracking-tight leading-[1.02] text-[#0F2C21]">
              Cravings don't <br />
              clock out. <br />
              <span className="text-[#E85D04]">Neither do we.</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-gray-700 max-w-xl font-normal leading-relaxed">
              Juicy smash burgers, fiery Suya wings, proper Parfait, and ice-cold Zobo fizz. Made fresh daily at 23 Ikpa Road, Uyo—and at your door in 30 minutes.
            </p>

            {/* CTAs matching Image 3 */}
            <div className="flex items-center space-x-4 pt-2">
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-[#E85D04] hover:bg-[#DC5200] text-white px-7 py-3.5 rounded-2xl font-bold text-base shadow-orange-glow flex items-center space-x-2 transition-all"
                >
                  <span>Order now</span>
                  <ArrowRight size={18} />
                </motion.button>
              </Link>

              <a href="#snack-carousel">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white border-2 border-[#0F2C21] text-[#0F2C21] hover:bg-gray-50 px-7 py-3.5 rounded-2xl font-bold text-base transition-colors"
                >
                  Quick bites
                </motion.button>
              </a>
            </div>

          </div>

          {/* Right Column: 30% OFF 3D Badge + Burger/Fries/Cola Photo */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-4 lg:pt-0">
            
            {/* 3D "30% OFF" Badge graphic matching Image 3 */}
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: [0.95, 1.05, 0.95], rotate: [-4, -6, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 left-4 sm:left-10 z-20 pointer-events-none drop-shadow-2xl"
            >
              <div className="relative font-display text-5xl sm:text-7xl leading-none text-[#FFD000] italic font-black select-none tracking-tighter"
                   style={{
                     WebkitTextStroke: '2px #CC0000',
                     textShadow: '4px 4px 0px #CC0000, 7px 7px 0px #880000'
                   }}>
                30%
                <div className="text-3xl sm:text-5xl -mt-2 uppercase not-italic text-white"
                     style={{
                       WebkitTextStroke: '2px #CC0000',
                       textShadow: '3px 3px 0px #CC0000, 5px 5px 0px #880000'
                     }}>
                  OFF
                </div>
              </div>
            </motion.div>

            {/* Oversized Food Photo Compilation matching Image 3 */}
            <div className="relative w-full max-w-[520px] h-[340px] sm:h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80"
                alt="24/7 Flavours Burger, Fries & Soda"
                fill
                priority
                className="object-contain filter drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>

          </div>

        </div>

        {/* Bottom Floating Feature Bar matching Image 3 */}
        <div className="mt-10 bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-gray-100 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* 1. 24/7 Open */}
            <div className="flex items-center space-x-4 pt-2 md:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FCE3CF] text-[#E85D04] flex items-center justify-center flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#0F2C21] leading-tight">24/7 Open</h4>
                <p className="text-xs text-gray-500 mt-0.5">Always cooking, day or night</p>
              </div>
            </div>

            {/* 2. 30 min ETA */}
            <div className="flex items-center space-x-4 pt-4 md:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FCE3CF] text-[#E85D04] flex items-center justify-center flex-shrink-0">
                <Bike size={24} />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#0F2C21] leading-tight">30 min ETA</h4>
                <p className="text-xs text-gray-500 mt-0.5">Hot and fresh to your door</p>
              </div>
            </div>

            {/* 3. No middleman */}
            <div className="flex items-center space-x-4 pt-4 md:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FCE3CF] text-[#E85D04] flex items-center justify-center flex-shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#0F2C21] leading-tight">No middleman</h4>
                <p className="text-xs text-gray-500 mt-0.5">Ordered direct from our kitchen</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
