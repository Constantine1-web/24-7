'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="w-full">
      {/* Main Hero Section matching reference image pixel-for-pixel */}
      <section className="hero" aria-labelledby="hero-title">
        
        {/* Left Hero Copy */}
        <div className="hero-copy">
          <p className="eyebrow font-[850]">UYO’S #1 FAST-CASUAL SPOT</p>
          
          <h1 id="hero-title">
            <span>Cravings don’t</span>
            <span>clock out.</span>
            <span className="accent">Neither do we.</span>
          </h1>

          <p className="hero-description">
            Juicy smash burgers, fiery Suya wings, proper Parfait and ice-cold Zobo fizz. Made fresh daily at 23 Ikpa Road, Uyo—and at your door in 30 minutes.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary" href="/menu">
              <span>Order now</span>
              <span className="arrow" aria-hidden="true">→</span>
            </Link>

            <a className="button button-secondary" href="#snack-carousel">
              Quick bites
            </a>
          </div>
        </div>

        {/* Right Hero Art Promo Graphic with Mix-Blend Mode */}
        <div className="hero-art" aria-label="30 percent off burger, fries and drink promotion">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[650px] aspect-[4/3] rounded-[18px] overflow-hidden"
          >
            <Image
              src="/images/hero-promo.png"
              alt="30% off meal deal with a burger, fries and iced drink"
              fill
              priority
              className="object-contain mix-blend-multiply filter drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

      </section>

      {/* Trust Bar Section matching reference image pixel-for-pixel */}
      <section className="trust-bar" aria-label="Delivery and service highlights">
        
        {/* 1. 24/7 Open */}
        <div className="trust-item">
          <span className="trust-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </span>
          <span className="trust-copy">
            <strong>24/7 Open</strong>
            <span>Always cooking, day or night</span>
          </span>
        </div>

        {/* 2. 30 min ETA */}
        <div className="trust-item">
          <span className="trust-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="6" cy="17" r="2.3"/>
              <circle cx="18" cy="17" r="2.3"/>
              <path d="M8.5 17h5.2l-2.5-6H7.8L6 14.7m7.7.1 2-7h3l1.1 4.5H13m-4.2-3.3L7.5 6H4"/>
            </svg>
          </span>
          <span className="trust-copy">
            <strong>30 min ETA</strong>
            <span>Hot and fresh to your door</span>
          </span>
        </div>

        {/* 3. No middleman */}
        <div className="trust-item">
          <span className="trust-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="9" cy="8" r="3"/>
              <circle cx="17" cy="9" r="2.5"/>
              <path d="M3.5 19c.2-3.4 2.4-5.2 5.5-5.2s5.4 1.8 5.6 5.2M15 14.2c2.9-.2 5.2 1.4 5.5 4.2"/>
            </svg>
          </span>
          <span className="trust-copy">
            <strong>No middleman</strong>
            <span>Ordered direct from our kitchen</span>
          </span>
        </div>

      </section>
    </div>
  );
}
