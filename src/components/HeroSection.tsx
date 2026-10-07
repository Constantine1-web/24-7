'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="w-full">
      
      {/* Main Hero Grid */}
      <section className="hero grid grid-cols-1 lg:grid-cols-[minmax(0,0.99fr)_minmax(0,1.01fr)] items-center gap-[clamp(30px,5.2vw,78px)] min-h-[min(70vw,688px)] py-8 md:py-12" aria-labelledby="hero-title">
        
        {/* Left Copy */}
        <div className="hero-copy min-w-0 pt-1">
          {/* Eyebrow Badge */}
          <p className="eyebrow inline-flex items-center min-h-[35px] mb-6 px-4 rounded-full bg-[#ffbd3e] text-[#062d26] text-[11px] font-[850] tracking-[1.15px] uppercase">
            UYO’S #1 FAST-CASUAL SPOT
          </p>

          {/* Headline matching user HTML */}
          <h1 id="hero-title" className="max-w-[690px] m-0 text-[clamp(44px,5.15vw,76px)] leading-[0.99] tracking-[-3.8px] font-[900] text-[#062d26]">
            <span className="block">Cravings don’t</span>
            <span className="block">clock out.</span>
            <span className="block accent text-[#bd3c0d]">Neither do we.</span>
          </h1>

          {/* Hero Description */}
          <p className="hero-description max-w-[590px] mt-6 color-[#303c38] text-[clamp(14px,1.28vw,17px)] leading-[1.58] tracking-[-0.12px]">
            Juicy smash burgers, fiery Suya wings, proper Parfait and ice-cold Zobo fizz. Made fresh daily at 23 Ikpa Road, Uyo—and at your door in 30 minutes.
          </p>

          {/* Hero Action Buttons */}
          <div className="hero-actions flex flex-wrap items-center gap-4 mt-7">
            <Link className="button button-primary min-h-[58px] inline-flex items-center justify-center gap-3 px-7 rounded-[13px] border-[1.5px] border-[#bd3c0d] bg-[#bd3c0d] text-white text-[15px] font-[800] shadow-sm hover:-translate-y-0.5 hover:bg-[#a93209] transition-all" href="/menu">
              <span>Order now</span>
              <span className="arrow text-[21px] leading-none" aria-hidden="true">→</span>
            </Link>

            <a className="button button-secondary min-h-[58px] inline-flex items-center justify-center gap-3 px-7 rounded-[13px] border-[1.5px] border-[#062d26] bg-[rgba(255,250,243,0.72)] text-[#062d26] text-[15px] font-[800] hover:-translate-y-0.5 hover:bg-[#062d26] hover:text-white transition-all" href="#snack-carousel">
              Quick bites
            </a>
          </div>
        </div>

        {/* Right Hero Art Promo Image */}
        <div className="hero-art grid place-items-center min-w-0" aria-label="30 percent off burger, fries and drink promotion">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[650px] aspect-[4/3] rounded-[18px] overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80"
              alt="30% off meal deal with a burger, fries and iced drink"
              fill
              priority
              className="object-contain filter drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

      </section>

      {/* Trust Bar Section matching user source code */}
      <section className="trust-bar grid grid-cols-1 md:grid-cols-3 items-center min-h-[112px] px-6 py-4 border border-white/90 rounded-[17px] bg-[rgba(255,255,255,0.9)] shadow-[0_10px_35px_rgba(72,49,28,0.045)] mb-8" aria-label="Delivery and service highlights">
        
        {/* 1. 24/7 Open */}
        <div className="trust-item flex items-center gap-4 py-3 md:py-0 px-2 sm:px-6">
          <span className="trust-icon flex-shrink-0 w-[58px] h-[58px] grid place-items-center rounded-full bg-[#fff7ef] text-[#bd3c0d]" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] fill-none stroke-current stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </span>
          <span className="trust-copy grid gap-1">
            <strong className="text-[15px] font-[850] leading-snug text-[#062d26]">24/7 Open</strong>
            <span className="text-[#676a67] text-[12px] leading-tight">Always cooking, day or night</span>
          </span>
        </div>

        {/* 2. 30 min ETA */}
        <div className="trust-item flex items-center gap-4 py-3 md:py-0 px-2 sm:px-6 border-t md:border-t-0 md:border-l border-[var(--line)]">
          <span className="trust-icon flex-shrink-0 w-[58px] h-[58px] grid place-items-center rounded-full bg-[#fff7ef] text-[#bd3c0d]" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] fill-none stroke-current stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
              <circle cx="6" cy="17" r="2.3"/>
              <circle cx="18" cy="17" r="2.3"/>
              <path d="M8.5 17h5.2l-2.5-6H7.8L6 14.7m7.7.1 2-7h3l1.1 4.5H13m-4.2-3.3L7.5 6H4"/>
            </svg>
          </span>
          <span className="trust-copy grid gap-1">
            <strong className="text-[15px] font-[850] leading-snug text-[#062d26]">30 min ETA</strong>
            <span className="text-[#676a67] text-[12px] leading-tight">Hot and fresh to your door</span>
          </span>
        </div>

        {/* 3. No middleman */}
        <div className="trust-item flex items-center gap-4 py-3 md:py-0 px-2 sm:px-6 border-t md:border-t-0 md:border-l border-[var(--line)]">
          <span className="trust-icon flex-shrink-0 w-[58px] h-[58px] grid place-items-center rounded-full bg-[#fff7ef] text-[#bd3c0d]" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] fill-none stroke-current stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
              <circle cx="9" cy="8" r="3"/>
              <circle cx="17" cy="9" r="2.5"/>
              <path d="M3.5 19c.2-3.4 2.4-5.2 5.5-5.2s5.4 1.8 5.6 5.2M15 14.2c2.9-.2 5.2 1.4 5.5 4.2"/>
            </svg>
          </span>
          <span className="trust-copy grid gap-1">
            <strong className="text-[15px] font-[850] leading-snug text-[#062d26]">No middleman</strong>
            <span className="text-[#676a67] text-[12px] leading-tight">Ordered direct from our kitchen</span>
          </span>
        </div>

      </section>

    </div>
  );
}
