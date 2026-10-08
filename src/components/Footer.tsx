'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Smartphone, Heart, Instagram, Twitter, Facebook, Download } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';
import { triggerPWAInstall } from '@/components/PWAInstallPrompt';

export default function Footer() {
  const handleInstallClick = () => {
    const res = triggerPWAInstall();
    if (!res) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-darkGreen text-brand-parchment pt-14 pb-12 border-t border-brand-lightGreen/30 relative overflow-hidden w-full max-w-full">
      {/* Decorative Texture & Glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen" style={{ backgroundImage: "url('/images/food-doodles-core.png')", backgroundRepeat: 'repeat', backgroundSize: '240px', filter: 'invert(1)' }}></div>
      <div className="absolute right-0 top-0 w-80 h-80 bg-brand-yellow/10 rounded-full filter blur-3xl pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 pb-12 border-b border-brand-lightGreen/20">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center space-x-3 group w-fit">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-brand-orange rounded-2xl flex items-center justify-center font-display text-2xl text-white shadow-[0_4px_12px_rgba(232,93,4,0.3)] group-hover:scale-105 transition-transform flex-shrink-0">
                24
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl tracking-tight text-white drop-shadow-sm leading-tight">
                  24/7 FLAVOURS
                </span>
                <span className="text-[9px] font-extrabold text-brand-yellow tracking-[2.2px] uppercase">
                  Uyo Fast-Casual Kitchen
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-300 max-w-sm font-medium leading-relaxed">
              Premium fast-casual urban food &amp; lifestyle ordering platform in Uyo, Akwa Ibom State. Built mobile-first as an installable Progressive Web App.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a 
                href={RESTAURANT_INFO.socialX} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow 24/7 Flavours on X"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow flex items-center justify-center text-white hover:text-brand-darkBrown transition-colors shadow-sm"
              >
                <Twitter size={15} fill="currentColor" />
              </a>
              <a 
                href="#" 
                aria-label="Follow 24/7 Flavours on Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow flex items-center justify-center text-white hover:text-brand-darkBrown transition-colors shadow-sm"
              >
                <Instagram size={15} />
              </a>
              <a 
                href="#" 
                aria-label="Follow 24/7 Flavours on Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow flex items-center justify-center text-white hover:text-brand-darkBrown transition-colors shadow-sm"
              >
                <Facebook size={15} fill="currentColor" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-display text-base sm:text-lg uppercase tracking-wider text-brand-yellow drop-shadow-sm">
              CONTACT US
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-200 font-medium">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-brand-yellow/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-brand-yellow" />
                </div>
                <span className="leading-snug">{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-brand-yellow/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={14} className="text-brand-yellow" />
                </div>
                <span className="leading-snug">{RESTAURANT_INFO.openingHours}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-brand-yellow/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-brand-yellow" />
                </div>
                <span className="leading-snug">{RESTAURANT_INFO.phone}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-base sm:text-lg uppercase tracking-wider text-brand-yellow drop-shadow-sm">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 font-medium">
              <li><Link href="/" className="hover:text-brand-yellow hover:translate-x-1 inline-block transition-transform">Home Page</Link></li>
              <li><Link href="/menu" className="hover:text-brand-yellow hover:translate-x-1 inline-block transition-transform">Full Food Menu</Link></li>
              <li><Link href="/#snack-carousel" className="hover:text-brand-yellow hover:translate-x-1 inline-block transition-transform">Quick Bites</Link></li>
              <li><Link href="/order-tracking/ORD-7892" className="hover:text-brand-yellow hover:translate-x-1 inline-block transition-transform">Live Order Tracker</Link></li>
              <li><Link href="/admin" className="hover:text-brand-yellow hover:translate-x-1 inline-block transition-transform">Admin Command Center</Link></li>
            </ul>
          </div>

          {/* PWA App CTA Block */}
          <div className="space-y-3">
            <h4 className="font-display text-base sm:text-lg uppercase tracking-wider text-brand-yellow drop-shadow-sm">
              GET THE 24/7 FLAVOURS APP
            </h4>
            <div className="bg-white/5 border border-white/15 p-4 rounded-2xl flex flex-col items-center text-center space-y-3">
              
              <p className="text-xs text-gray-300 font-medium leading-relaxed">
                Enjoy instant ordering and a fast app experience directly from your phone.
              </p>

              <button
                onClick={handleInstallClick}
                className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white py-2 px-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-sm transition-all"
              >
                <Download size={14} />
                <span>INSTALL APP</span>
              </button>

              {/* QR Code Placeholder with Real Food Brand Styling */}
              <div className="p-2 bg-white rounded-xl shadow-md inline-flex flex-col items-center">
                <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#062D26]">
                  {/* Outer Frame */}
                  <rect x="2" y="2" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="3" />
                  <rect x="7" y="7" width="12" height="12" rx="2" fill="currentColor" />
                  
                  <rect x="44" y="2" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="3" />
                  <rect x="49" y="7" width="12" height="12" rx="2" fill="currentColor" />
                  
                  <rect x="2" y="44" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="3" />
                  <rect x="7" y="49" width="12" height="12" rx="2" fill="currentColor" />
                  
                  {/* Pattern dots */}
                  <rect x="30" y="6" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="30" y="18" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="6" y="30" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="18" y="30" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="30" y="30" width="8" height="8" rx="2" fill="#BD3C0D" />
                  <rect x="46" y="30" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="56" y="30" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="30" y="46" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="44" y="46" width="8" height="8" rx="2" fill="currentColor" />
                  <rect x="56" y="46" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="30" y="56" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="46" y="58" width="16" height="6" rx="1.5" fill="currentColor" />
                </svg>
                <span className="text-[7.5px] font-black text-[#062D26] uppercase tracking-wider mt-1">SCAN TO OPEN</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-semibold text-gray-400/80 space-y-3 sm:space-y-0 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} 24/7 Flavours, Uyo. All rights reserved.
          </div>
          <div className="flex items-center space-x-1.5 justify-center">
            <span>Crafted with</span>
            <Heart size={13} className="fill-brand-orange text-brand-orange drop-shadow-sm" />
            <span>for Uyo, Akwa Ibom State</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
