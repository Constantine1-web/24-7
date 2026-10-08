'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Smartphone, Heart, Instagram, Twitter, Facebook } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';

export default function Footer() {
  return (
    <footer className="bg-brand-darkGreen text-brand-parchment pt-16 pb-12 border-t border-brand-lightGreen/30 relative overflow-hidden">
      {/* Decorative Texture & Blob */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen" style={{ backgroundImage: "url('/images/food-doodles-core.png')", backgroundRepeat: 'repeat', backgroundSize: '240px', filter: 'invert(1)' }}></div>
      <div className="absolute right-0 top-0 w-96 h-96 bg-brand-yellow/15 rounded-full filter blur-3xl pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-brand-lightGreen/20">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center font-display text-2xl text-white shadow-[0_4px_12px_rgba(232,93,4,0.3)] group-hover:scale-105 transition-transform">
                24
              </div>
              <span className="font-display text-3xl tracking-tight text-white drop-shadow-sm">
                24/7 FLAVOURS
              </span>
            </Link>

            <p className="text-sm text-gray-300 max-w-sm font-medium leading-relaxed">
              Premium fast-casual urban food &amp; lifestyle ordering platform in Uyo, Akwa Ibom State. Built mobile-first as an installable progressive web app.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href={RESTAURANT_INFO.socialX} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow flex items-center justify-center text-white hover:text-brand-darkBrown transition-colors shadow-sm">
                <Twitter size={16} fill="currentColor" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow flex items-center justify-center text-white hover:text-brand-darkBrown transition-colors shadow-sm">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow flex items-center justify-center text-white hover:text-brand-darkBrown transition-colors shadow-sm">
                <Facebook size={16} fill="currentColor" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="font-display text-lg uppercase tracking-wider text-brand-yellow drop-shadow-sm">
              CONTACT US
            </h4>
            <div className="space-y-4 text-sm text-gray-200 font-medium">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={16} className="text-brand-yellow" />
                </div>
                <span className="leading-snug">{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={16} className="text-brand-yellow" />
                </div>
                <span className="leading-snug">{RESTAURANT_INFO.openingHours}</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={16} className="text-brand-yellow" />
                </div>
                <span className="leading-snug">{RESTAURANT_INFO.phone}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display text-lg uppercase tracking-wider text-brand-yellow drop-shadow-sm">
              EXPLORE
            </h4>
            <ul className="space-y-3 text-sm text-gray-300 font-medium">
              <li><Link href="/" className="hover:text-brand-yellow hover:translate-x-1 inline-block transition-transform">Home Page</Link></li>
              <li><Link href="/menu" className="hover:text-brand-yellow hover:translate-x-1 inline-block transition-transform">Full Food Menu</Link></li>
              <li><Link href="#snack-carousel" className="hover:text-brand-yellow hover:translate-x-1 inline-block transition-transform">Quick Bites</Link></li>
              <li><Link href="/order-tracking/ORD-7892" className="hover:text-brand-yellow hover:translate-x-1 inline-block transition-transform">Live Order Tracker</Link></li>
              <li><Link href="/admin" className="hover:text-brand-yellow hover:translate-x-1 inline-block transition-transform">Admin Command Center</Link></li>
            </ul>
          </div>

          {/* PWA App CTA Block */}
          <div className="space-y-4">
            <h4 className="font-display text-lg uppercase tracking-wider text-brand-yellow drop-shadow-sm">
              GET THE APP
            </h4>
            <div className="bg-brand-lightGreen/10 border border-brand-lightGreen/20 p-5 rounded-2xl flex flex-col items-center text-center space-y-3 hover:bg-brand-lightGreen/20 transition-colors">
              
              <div className="flex items-center space-x-2 text-brand-yellow font-black text-xs uppercase tracking-widest">
                <Smartphone size={18} />
                <span>INSTALL PWA</span>
              </div>
              
              <p className="text-xs text-gray-300 font-medium leading-relaxed">
                Open in Safari or Chrome & tap <strong>"Add to Home Screen"</strong> for instant ordering.
              </p>

              {/* QR Code Placeholder */}
              <div className="mt-2 p-1.5 bg-white rounded-xl shadow-inner inline-block">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                  <Smartphone size={20} className="text-gray-400 mb-1" />
                  <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">SCAN ME</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-semibold text-gray-400/80 space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} 24/7 Flavours, Uyo. All rights reserved.
          </div>
          <div className="flex items-center space-x-1.5">
            <span>Crafted with</span>
            <Heart size={14} className="fill-brand-orange text-brand-orange drop-shadow-sm" />
            <span>for Uyo, Akwa Ibom State</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
