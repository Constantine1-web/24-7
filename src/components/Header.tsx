'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Smartphone, MapPin, Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'MENU', href: '/menu' },
    { name: 'ORDER TRACKER', href: '/order-tracking/ORD-7892' },
    { name: 'ADMIN PANEL', href: '/admin' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-brand-darkGreen text-brand-parchment text-xs py-2 px-4 border-b border-brand-lightGreen/30 font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-brand-yellow">
              <MapPin size={13} />
              <span>23 Ikpa Road, Uyo</span>
            </span>
            <span className="hidden sm:flex items-center space-x-1 text-emerald-400">
              <Clock size={13} />
              <span>Open 24/7 for Delivery</span>
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="bg-brand-orange text-white px-2 py-0.5 rounded-full font-semibold">
              FREE DELIVERY OVER ₦15,000
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-brand-green/95 backdrop-blur-md text-brand-parchment border-b border-brand-lightGreen/40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Desktop Left Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-bold tracking-wider">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-brand-yellow ${
                    isActive ? 'text-brand-yellow' : 'text-brand-parchment/90'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-brand-yellow rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logo / Wordmark (Center) */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center font-display text-2xl text-white shadow-md transform group-hover:rotate-6 transition-transform">
              24
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl tracking-tight leading-none text-brand-parchment group-hover:text-brand-yellow transition-colors">
                24/7 FLAVOURS
              </span>
              <span className="text-[9px] tracking-widest uppercase font-bold text-brand-yellow/90">
                URBAN KITCHEN • UYO
              </span>
            </div>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search Menu"
              className="p-2 rounded-full hover:bg-brand-lightGreen/50 text-brand-parchment transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Cart Trigger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsCartOpen(true)}
              className="relative bg-brand-orange hover:bg-brand-orangeHover text-white px-4 py-2.5 rounded-full font-bold text-sm flex items-center space-x-2 shadow-orange-glow transition-all"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">CART</span>
              <span className="bg-white text-brand-darkGreen font-extrabold text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </motion.button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-parchment rounded-lg hover:bg-brand-lightGreen/50"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Quick Search Bar Drawer */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-brand-darkGreen border-t border-brand-lightGreen/30 overflow-hidden"
            >
              <div className="max-w-3xl mx-auto p-4">
                <div className="relative flex items-center">
                  <Search size={18} className="absolute left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search burgers, Afang soup, Zobo, Suya fries..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        window.location.href = `/menu?search=${encodeURIComponent(
                          (e.target as HTMLInputElement).value
                        )}`;
                      }
                    }}
                    className="w-full bg-brand-green/80 text-white pl-10 pr-4 py-3 rounded-xl border border-brand-lightGreen focus:outline-none focus:border-brand-yellow text-sm placeholder-gray-400"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-brand-darkGreen border-t border-brand-lightGreen/40 px-6 py-6 space-y-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-bold tracking-wide text-brand-parchment hover:text-brand-yellow py-2 border-b border-brand-lightGreen/20"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 flex flex-col space-y-3">
                <div className="text-xs text-brand-yellow font-bold uppercase tracking-wider">
                  24/7 Flavours App
                </div>
                <div className="text-xs text-gray-300">
                  📍 23 Ikpa Road, Uyo, Akwa Ibom State
                </div>
                <div className="text-xs text-gray-300">
                  📞 +234 812 345 6789
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
