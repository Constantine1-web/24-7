'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="w-full">
      {/* Main Hero Container */}
      <section className="hero grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 min-h-[580px] py-6 sm:py-10">
        
        {/* Left Copy Column */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          {/* Top Yellow Pill Badge */}
          <div className="inline-block">
            <span className="bg-[#FFBD3E] text-[#062D26] px-4 py-1.5 rounded-full text-[11px] font-black tracking-[1.15px] uppercase shadow-xs">
              UYO’S #1 FAST-CASUAL SPOT
            </span>
          </div>

          {/* Headline matching image 100% */}
          <h1 className="font-display text-[46px] sm:text-[68px] xl:text-[76px] leading-[0.98] tracking-[-3.2px] font-black text-[#062D26]">
            Cravings don’t <br />
            clock out. <br />
            <span className="text-[#C84210]">Neither do we.</span>
          </h1>

          {/* Subtitle Description matching image 100% */}
          <p className="text-[15px] sm:text-[17px] text-[#3B4944] leading-[1.58] max-w-[540px] font-normal tracking-[-0.12px]">
            Juicy smash burgers, fiery Suya wings, proper Parfait. <br className="hidden sm:inline" />
            and ice-cold Zobo fizz. Made fresh daily at 23 Ikpa Road, <br className="hidden sm:inline" />
            Uyo—and at your door in 30 minutes.
          </p>

          {/* Action Buttons matching image 100% */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#C84210] hover:bg-[#B2380B] text-white px-7 py-3.5 rounded-[14px] font-bold text-[15px] flex items-center space-x-2 shadow-md transition-all cursor-pointer"
              >
                <span>Order now</span>
                <span className="text-lg leading-none">→</span>
              </motion.button>
            </Link>

            <a href="#snack-carousel">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FFFDF9] border border-[#062D26] text-[#062D26] hover:bg-[#062D26] hover:text-white px-7 py-3.5 rounded-[14px] font-bold text-[15px] transition-all cursor-pointer"
              >
                Quick bites
              </motion.button>
            </a>
          </div>

        </div>

        {/* Right Promo Graphics Column: User-Uploaded Exact Promo Image */}
        <div className="lg:col-span-6 relative flex items-center justify-center pt-6 lg:pt-0">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[580px] h-[380px] sm:h-[480px]"
          >
            <Image
              src="/images/hero-promo.png"
              alt="30% off burger, fries and cold iced drink promotion"
              fill
              priority
              className="object-contain filter drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

      </section>

      {/* Bottom Floating White Trust Bar matching image 100% */}
      <section className="bg-white rounded-[24px] p-5 sm:p-6 shadow-lg border border-gray-100 max-w-6xl mx-auto my-6" aria-label="Delivery and service highlights">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200/80">
          
          {/* 1. 24/7 Open */}
          <div className="flex items-center space-x-4 pt-2 md:pt-0 sm:px-6">
            <div className="w-[54px] h-[54px] rounded-full bg-[#FDF0E6] text-[#C84210] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] fill-none stroke-current stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div>
              <strong className="text-[15px] font-black leading-tight text-[#062D26] block">24/7 Open</strong>
              <span className="text-xs text-[#676A67] mt-0.5 block">Always cooking, day or night</span>
            </div>
          </div>

          {/* 2. 30 min ETA */}
          <div className="flex items-center space-x-4 pt-4 md:pt-0 sm:px-6">
            <div className="w-[54px] h-[54px] rounded-full bg-[#FDF0E6] text-[#C84210] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] fill-none stroke-current stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
                <circle cx="6" cy="17" r="2.3"/>
                <circle cx="18" cy="17" r="2.3"/>
                <path d="M8.5 17h5.2l-2.5-6H7.8L6 14.7m7.7.1 2-7h3l1.1 4.5H13m-4.2-3.3L7.5 6H4"/>
              </svg>
            </div>
            <div>
              <strong className="text-[15px] font-black leading-tight text-[#062D26] block">30 min ETA</strong>
              <span className="text-xs text-[#676A67] mt-0.5 block">Hot and fresh to your door</span>
            </div>
          </div>

          {/* 3. No middleman */}
          <div className="flex items-center space-x-4 pt-4 md:pt-0 sm:px-6">
            <div className="w-[54px] h-[54px] rounded-full bg-[#FDF0E6] text-[#C84210] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] fill-none stroke-current stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
                <circle cx="9" cy="8" r="3"/>
                <circle cx="17" cy="9" r="2.5"/>
                <path d="M3.5 19c.2-3.4 2.4-5.2 5.5-5.2s5.4 1.8 5.6 5.2M15 14.2c2.9-.2 5.2 1.4 5.5 4.2"/>
              </svg>
            </div>
            <div>
              <strong className="text-[15px] font-black leading-tight text-[#062D26] block">No middleman</strong>
              <span className="text-xs text-[#676A67] mt-0.5 block">Ordered direct from our kitchen</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
