'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      quote:
        'The Uyo Double Smash Burger is hands-down the best burger in Akwa Ibom! Smashed crispy, juicy, and that Suya aioli is pure gold. Delivered to my office on Ikpa Road in 20 minutes.',
      name: 'Dr. Iniubong Udoh',
      location: 'University of Uyo District',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      tag: 'VERIFIED CUSTOMER',
    },
    {
      id: 2,
      quote:
        'I added 24/7 Flavours directly to my phone home screen. It literally feels like an app! Their Loaded Milkshakes and cold Zobo sparkler are my late-night order go-to.',
      name: 'Kufre-Abasi Effiong',
      location: 'Ewet Housing Estate, Uyo',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      tag: 'VERIFIED CUSTOMER',
    },
    {
      id: 3,
      quote:
        'Finally a local restaurant in Uyo with a high-end brand feel and insanely fast delivery. Asun fried rice is packed with flavor!',
      name: 'Ememobong Akpan',
      location: 'Wellington Bassey Way',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      tag: 'VERIFIED CUSTOMER',
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[currentIdx];

  return (
    <section className="py-16 sm:py-20 bg-brand-orange text-white relative overflow-hidden">
      {/* Decorative Brand Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen" style={{ backgroundImage: "url('/images/food-doodles-core.png')", backgroundRepeat: 'repeat', backgroundSize: '240px', filter: 'invert(1)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Editorial Section Label */}
        <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase bg-white/20 px-4 py-1.5 rounded-full inline-block mb-4 text-white shadow-sm border border-white/10">
          WHAT OUR CUSTOMERS SAY
        </span>

        <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white mb-8 sm:mb-10">
          UYO'S MOST LOVED KITCHEN
        </h2>

        {/* Testimonial Card Display */}
        <div className="relative bg-brand-darkBrown/95 text-brand-parchment px-4 py-8 sm:p-10 rounded-3xl shadow-2xl max-w-3xl mx-auto border border-white/15 backdrop-blur-xl">
          <Quote size={40} className="text-brand-yellow/40 mx-auto mb-4 absolute top-6 left-1/2 -translate-x-1/2 sm:static sm:translate-x-0" />

          <div className="min-h-[300px] sm:min-h-[260px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-6 pt-6 sm:pt-0"
              >
                {/* Rating Stars */}
                <div className="flex justify-center space-x-1.5 text-brand-yellow drop-shadow-sm">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={24} className="fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="font-serif text-xl sm:text-2xl text-white font-bold italic leading-snug sm:leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
                  "{current.quote}"
                </p>

                {/* Customer details */}
                <div className="pt-6 flex flex-col items-center">
                  <h4 className="font-display text-lg sm:text-xl uppercase tracking-tight text-brand-yellow">
                    {current.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 font-semibold">{current.location}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-between items-center mt-6 pt-4 sm:mt-8 sm:pt-6 border-t border-white/10">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="bg-brand-yellow text-brand-darkBrown hover:bg-brand-parchment hover:scale-105 p-3 rounded-full transition-all shadow-md"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            <div className="flex space-x-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`h-2.5 sm:h-3 rounded-full transition-all ${
                    i === currentIdx ? 'bg-brand-yellow w-8 sm:w-10' : 'bg-white/30 w-2.5 sm:w-3 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="bg-brand-yellow text-brand-darkBrown hover:bg-brand-parchment hover:scale-105 p-3 rounded-full transition-all shadow-md"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Press Badges & Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 sm:mt-16 max-w-4xl mx-auto pt-8 border-t border-white/20 text-center">
          <div>
            <div className="font-display text-3xl sm:text-4xl text-brand-yellow drop-shadow-sm">15K+</div>
            <div className="text-[10px] sm:text-xs text-white/90 uppercase font-black tracking-widest mt-1">Orders Delivered</div>
          </div>
          <div>
            <div className="font-display text-3xl sm:text-4xl text-brand-yellow drop-shadow-sm">4.9</div>
            <div className="text-[10px] sm:text-xs text-white/90 uppercase font-black tracking-widest mt-1">Customer Rating</div>
          </div>
          <div>
            <div className="font-display text-3xl sm:text-4xl text-brand-yellow drop-shadow-sm">24/7</div>
            <div className="text-[10px] sm:text-xs text-white/90 uppercase font-black tracking-widest mt-1">Daily Service</div>
          </div>
          <div>
            <div className="font-display text-3xl sm:text-4xl text-brand-yellow drop-shadow-sm">UYO</div>
            <div className="text-[10px] sm:text-xs text-white/90 uppercase font-black tracking-widest mt-1">23 Ikpa Road</div>
          </div>
        </div>

      </div>
    </section>
  );
}
