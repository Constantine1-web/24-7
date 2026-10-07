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
      tag: 'VERIFIED FOODIE',
    },
    {
      id: 2,
      quote:
        'I added 24/7 Flavours directly to my phone home screen. It literally feels like an app! Their Afang soup supreme and cold Zobo sparkler are my late-night order go-to.',
      name: 'Kufre-Abasi Effiong',
      location: 'Ewet Housing Estate, Uyo',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      tag: 'PWA APP USER',
    },
    {
      id: 3,
      quote:
        'Finally a local restaurant in Uyo with a high-end brand feel and insanely fast delivery. Asun fried rice is packed with flavor!',
      name: 'Ememobong Akpan',
      location: 'Wellington Bassey Way',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      tag: 'REGULAR CUSTOMER',
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
    <section className="py-20 bg-brand-orange text-white relative overflow-hidden">
      {/* Decorative Wave Top & Bottom overlay shapes */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FBF7EE_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Editorial Section Label */}
        <span className="text-xs font-extrabold tracking-widest uppercase bg-white/20 px-4 py-1.5 rounded-full inline-block mb-4 text-white">
          WHAT OUR CUSTOMERS SAY
        </span>

        <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white mb-10">
          UYO'S MOST LOVED KITCHEN
        </h2>

        {/* Testimonial Card Display */}
        <div className="relative bg-brand-darkBrown/90 text-brand-parchment p-8 sm:p-12 rounded-3xl shadow-card-elevated max-w-3xl mx-auto border border-white/10 backdrop-blur-md">
          <Quote size={48} className="text-brand-yellow/30 mx-auto mb-4" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Rating Stars */}
              <div className="flex justify-center space-x-1 text-brand-yellow">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-brand-yellow" />
                ))}
              </div>

              {/* Quote text */}
              <p className="font-sans text-lg sm:text-xl text-brand-parchment font-medium italic leading-relaxed">
                "{current.quote}"
              </p>

              {/* Customer details */}
              <div className="pt-4 border-t border-white/10 flex flex-col items-center">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-yellow mb-2 shadow-md">
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-display text-xl uppercase tracking-tight text-brand-yellow">
                  {current.name}
                </h4>
                <p className="text-xs text-gray-300 font-semibold">{current.location}</p>

                <span className="mt-2 inline-flex items-center space-x-1 text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full uppercase">
                  <CheckCircle size={12} />
                  <span>{current.tag}</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex space-x-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentIdx ? 'bg-brand-yellow w-6' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Press Badges & Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto pt-8 border-t border-white/20 text-center">
          <div>
            <div className="font-display text-2xl sm:text-3xl text-brand-yellow">15,000+</div>
            <div className="text-xs text-white/80 uppercase font-semibold">Orders Delivered</div>
          </div>
          <div>
            <div className="font-display text-2xl sm:text-3xl text-brand-yellow">4.9 / 5.0</div>
            <div className="text-xs text-white/80 uppercase font-semibold">Customer Rating</div>
          </div>
          <div>
            <div className="font-display text-2xl sm:text-3xl text-brand-yellow">24 HOURS</div>
            <div className="text-xs text-white/80 uppercase font-semibold">Daily Service</div>
          </div>
          <div>
            <div className="font-display text-2xl sm:text-3xl text-brand-yellow">UYO, NIGERIA</div>
            <div className="text-xs text-white/80 uppercase font-semibold">23 Ikpa Road</div>
          </div>
        </div>

      </div>
    </section>
  );
}
