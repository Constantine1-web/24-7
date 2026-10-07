'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Flame, Clock, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section className="relative bg-brand-green text-brand-parchment overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-brand-lightGreen/30">
      {/* Decorative Organic Background Yellow Shape */}
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-brand-yellow/20 rounded-full filter blur-3xl -mr-20 -mb-20 pointer-events-none" />
      <div className="absolute left-10 top-1/3 w-64 h-64 bg-brand-orange/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Repeating Pattern Graphic Background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#FBF7EE_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Pill Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center">
              <span className="inline-flex items-center space-x-2 bg-brand-yellow text-brand-darkGreen px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md">
                <Flame size={14} className="fill-brand-orange text-brand-orange" />
                <span>UYO'S #1 FAST-CASUAL SPOT</span>
              </span>
            </motion.div>

            {/* Huge Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-6xl xl:text-7xl uppercase leading-[0.95] tracking-tight text-white"
            >
              CRAVEABLE <span className="text-brand-yellow underline decoration-brand-orange decoration-wavy decoration-4">URBAN BITES</span> &amp; SMASH BURGERS
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-brand-parchment/85 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Order directly from 24/7 Flavours at 23 Ikpa Road, Uyo. Freshly smashed beef patties, spicy Suya wings, authentic Afang soup specials, and ice-cold Zobo craft fizz. Delivered hot to your door in 30 minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
            >
              <Link href="/menu" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orangeHover text-white px-8 py-4 rounded-2xl font-extrabold text-base tracking-wide flex items-center justify-center space-x-3 shadow-orange-glow transition-all"
                >
                  <span>ORDER NOW</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>

              <a href="#snack-carousel" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto border-2 border-brand-parchment/30 hover:border-brand-yellow text-brand-parchment hover:text-brand-yellow px-7 py-4 rounded-2xl font-bold text-base transition-colors"
                >
                  QUICK BITES
                </motion.button>
              </a>
            </motion.div>

            {/* Feature Micro-Badges */}
            <motion.div
              variants={itemVariants}
              className="pt-4 grid grid-cols-3 gap-2 border-t border-brand-lightGreen/30 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-brand-yellow font-extrabold text-sm flex items-center gap-1">
                  <Clock size={14} /> 24/7 OPEN
                </span>
                <span className="text-[11px] text-gray-300">Always Cooking</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-brand-yellow font-extrabold text-sm flex items-center gap-1">
                  <Sparkles size={14} /> 30 MIN ETA
                </span>
                <span className="text-[11px] text-gray-300">Hot &amp; Fresh</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-brand-yellow font-extrabold text-sm flex items-center gap-1">
                  <ShieldCheck size={14} /> NO MIDDLEMAN
                </span>
                <span className="text-[11px] text-gray-300">Direct Kitchen</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Oversized Food Image & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Animated Floating Graphic Badge */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 z-20 bg-brand-yellow text-brand-darkGreen p-3 sm:p-4 rounded-2xl shadow-xl transform -rotate-6 border-2 border-white"
            >
              <div className="font-display text-lg sm:text-xl leading-none">FRESHLY SMASHED</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-brand-orange">Uyo's Favorite</div>
            </motion.div>

            {/* Floating Price Sticker */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-6 right-2 z-20 bg-brand-orange text-white p-3 rounded-full shadow-2xl font-display text-base sm:text-lg border-2 border-white flex flex-col items-center justify-center w-20 h-20 text-center leading-none"
            >
              <span className="text-[9px] font-sans font-bold">FROM</span>
              <span className="font-extrabold">₦5,500</span>
            </motion.div>

            {/* Main Hero Food Graphic */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-[290px] h-[290px] sm:w-[420px] sm:h-[420px] rounded-3xl overflow-hidden border-4 border-brand-yellow/50 shadow-card-elevated"
            >
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
                alt="24/7 Flavours Uyo Double Smash Burger"
                fill
                priority
                className="object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
