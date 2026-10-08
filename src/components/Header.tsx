'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Moon, Sun } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Order Tracker', href: '/order-tracking/ORD-7892' },
    { name: 'Admin Panel', href: '/admin' },
  ];

  return (
    <header className="px-[var(--gutter)] py-4 min-h-[91px] flex items-center justify-between gap-4 border-b-[1.5px] border-[rgba(6,45,38,0.12)] dark:border-[rgba(255,250,243,0.1)] bg-[#fffaf3]/85 dark:bg-[#08140f]/85 backdrop-blur-md relative z-40 shadow-sm transition-colors duration-300">
      
      {/* Brand Logo & Tagline */}
      <Link className="flex items-center gap-3 w-fit flex-shrink-0" href="/" aria-label="24/7 Flavours home">
        <span className="brand-mark font-display">24</span>
        <span className="brand-copy flex flex-col gap-0.5">
          <span className="brand-name font-display text-[clamp(17px,1.9vw,25px)] text-[#062d26] dark:text-brand-parchment leading-none tracking-tight transition-colors">
            24/7 FLAVOURS
          </span>
          <span className="brand-tagline text-[9px] font-extrabold text-[#bd3c0d] tracking-[2.4px]">
            UYO NIGERIAN KITCHEN
          </span>
        </span>
      </Link>

      {/* Main Navigation Links */}
      <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-8" aria-label="Main navigation">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={`relative py-2.5 text-[13px] font-semibold tracking-tight transition-colors hover:text-[#bd3c0d] dark:hover:text-[#ff7b24] ${
                isActive ? 'text-[#062d26] dark:text-brand-parchment font-bold' : 'text-[#303c38] dark:text-[#a3a8a5]'
              }`}
            >
              {link.name}
              {isActive && (
                <motion.span
                  layoutId="navUnderline"
                  className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#bd3c0d]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Header Actions (Search & Cart Button) */}
      <div className="header-actions flex items-center justify-end gap-1 sm:gap-3">
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle Dark Mode"
            className="p-2 sm:p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#062d26] dark:text-brand-parchment transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        <button
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Search Menu"
          className="p-2 sm:p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#062d26] dark:text-brand-parchment transition-colors"
        >
          <Search size={18} />
        </button>

        <button
          className="cart-button shadow-sm"
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Cart, ${totalItems} items`}
        >
          <svg className="cart-icon w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 4h2l2.1 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="20" r="1.3" fill="currentColor" />
            <circle cx="18" cy="20" r="1.3" fill="currentColor" />
          </svg>
          <span className="font-bold text-sm">Cart</span>
          <span className="cart-count">{totalItems}</span>
        </button>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#062d26] rounded-lg hover:bg-black/5"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Search Drawer */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-[var(--line)] shadow-lg z-30"
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
                  className="w-full bg-gray-50 text-[#062d26] pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#bd3c0d] text-sm"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#fffaf3] border-b border-[var(--line)] px-6 py-6 space-y-3 shadow-xl z-30"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-bold text-[#062d26] hover:text-[#bd3c0d] py-2 border-b border-gray-100"
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
