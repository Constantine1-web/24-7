'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Smartphone, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';

export default function Footer() {
  return (
    <footer className="bg-brand-darkGreen text-brand-parchment pt-16 pb-12 border-t border-brand-lightGreen/30 relative overflow-hidden">
      {/* Decorative Texture & Blob */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen" style={{ backgroundImage: "url('/images/food-doodles-core.png')", backgroundRepeat: 'repeat', backgroundSize: '240px', filter: 'invert(1)' }}></div>
      <div className="absolute right-0 top-0 w-96 h-96 bg-brand-yellow/15 rounded-full filter blur-3xl pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-lightGreen/30">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center font-display text-2xl text-white shadow-md">
                24
              </div>
              <span className="font-display text-2xl tracking-tight text-brand-parchment">
                24/7 FLAVOURS
              </span>
            </Link>

            <p className="text-sm text-gray-300 max-w-sm font-normal leading-relaxed">
              Premium fast-casual urban food &amp; lifestyle ordering platform in Uyo, Akwa Ibom State. Built mobile-first as an installable progressive web app.
            </p>

            <div className="pt-2 space-y-2 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-brand-yellow flex-shrink-0" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-brand-yellow flex-shrink-0" />
                <span>{RESTAURANT_INFO.openingHours}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-brand-yellow flex-shrink-0" />
                <span>{RESTAURANT_INFO.phone}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wider text-brand-yellow mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300 font-medium">
              <li><Link href="/" className="hover:text-brand-yellow transition-colors">Home Page</Link></li>
              <li><Link href="/menu" className="hover:text-brand-yellow transition-colors">Full Food Menu</Link></li>
              <li><Link href="#snack-carousel" className="hover:text-brand-yellow transition-colors">Quick Bites</Link></li>
              <li><Link href="/order-tracking/ORD-7892" className="hover:text-brand-yellow transition-colors">Live Order Tracker</Link></li>
              <li><Link href="/admin" className="hover:text-brand-yellow transition-colors">Admin Command Center</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wider text-brand-yellow mb-4">
              POPULAR DISHES
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300 font-medium">
              <li><Link href="/menu?category=burgers" className="hover:text-brand-yellow transition-colors">Uyo Double Smash Burger</Link></li>
              <li><Link href="/menu?category=mains" className="hover:text-brand-yellow transition-colors">Afang Soup Supreme</Link></li>
              <li><Link href="/menu?category=mains" className="hover:text-brand-yellow transition-colors">Smoky Party Jollof</Link></li>
              <li><Link href="/menu?category=chicken" className="hover:text-brand-yellow transition-colors">Spicy Suya Wings</Link></li>
              <li><Link href="/menu?category=drinks" className="hover:text-brand-yellow transition-colors">Zobo Hibiscus Sparkler</Link></li>
            </ul>
          </div>

          {/* PWA App CTA Block */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wider text-brand-yellow mb-4">
              RESTAURANT APP
            </h4>
            <div className="bg-brand-green/80 border border-brand-lightGreen p-4 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 text-brand-yellow font-extrabold text-xs">
                <Smartphone size={16} />
                <span>INSTALL ON YOUR PHONE</span>
              </div>
              <p className="text-[11px] text-gray-300 leading-snug">
                Open in Chrome or Safari, tap 'Add to Home Screen' for instant ordering experience.
              </p>
              <a
                href={RESTAURANT_INFO.socialX}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-bold text-brand-yellow hover:underline"
              >
                Follow on X: @dfwconstantine →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} 24/7 Flavours, Uyo. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart size={14} className="fill-brand-orange text-brand-orange" />
            <span>for Uyo, Akwa Ibom State</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
