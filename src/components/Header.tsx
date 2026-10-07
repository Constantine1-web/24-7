'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Order Tracker', href: '/order-tracking/ORD-7892' },
    { name: 'Admin Panel', href: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDF8F2]/95 backdrop-blur-md text-[#0F2C21] border-b border-gray-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo / Wordmark (Left) matching Image 3 */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 bg-[#E85D04] rounded-2xl flex items-center justify-center font-display text-2xl text-white shadow-md transform group-hover:rotate-6 transition-transform">
            24
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl tracking-tight leading-none text-[#0F2C21] group-hover:text-[#E85D04] transition-colors">
              24/7 FLAVOURS
            </span>
            <span className="text-[10px] tracking-wider uppercase font-bold text-[#E85D04]">
              UYO • NIGERIAN KITCHEN
            </span>
          </div>
        </Link>

        {/* Desktop Center Navigation matching Image 3 */}
        <nav className="hidden md:flex items-center space-x-8 text-base font-bold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-[#E85D04] ${
                  isActive ? 'text-[#0F2C21]' : 'text-gray-700'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#E85D04] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Cart Button matching Image 3 */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search Menu"
            className="p-2.5 rounded-full hover:bg-gray-200/60 text-[#0F2C21] transition-colors"
          >
            <Search size={20} />
          </button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsCartOpen(true)}
            className="bg-[#E85D04] hover:bg-[#DC5200] text-white px-5 py-2.5 rounded-2xl font-extrabold text-sm flex items-center space-x-2 shadow-orange-glow transition-all"
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            <span className="bg-white text-[#E85D04] font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </motion.button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0F2C21] rounded-lg hover:bg-gray-200/60"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Quick Search Drawer */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-t border-gray-200 overflow-hidden"
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
                  className="w-full bg-gray-100 text-[#0F2C21] pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E85D04] text-sm placeholder-gray-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t border-gray-200 px-6 py-6 space-y-4 shadow-lg"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-bold text-[#0F2C21] hover:text-[#E85D04] py-2 border-b border-gray-100"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
