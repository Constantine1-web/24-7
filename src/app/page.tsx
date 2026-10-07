import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedCategories from '@/components/FeaturedCategories';
import WaveDivider from '@/components/WaveDivider';
import SnackCarousel from '@/components/SnackCarousel';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { MENU_ITEMS } from '@/data/menuData';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';

export default function HomePage() {
  const popularItems = MENU_ITEMS.filter((item) => item.popular).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-brand-parchment">
      {/* Editorial Hero Section */}
      <HeroSection />

      {/* Featured Categories Showcase */}
      <FeaturedCategories />

      {/* Wave Transition */}
      <WaveDivider fillColor="#FBF7EE" bgColor="#FBF7EE" />

      {/* Signature Snack Catalog ("GRAB A BITE") */}
      <SnackCarousel />

      {/* Popular Menu Preview Grid Section */}
      <section className="py-16 md:py-24 bg-brand-parchment text-brand-darkGreen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 bg-brand-yellow text-brand-darkGreen px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
                <Flame size={14} className="fill-brand-orange text-brand-orange" />
                <span>POPULAR DISHES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-brand-darkGreen">
                UYO'S MOST CRAVED MENU
              </h2>
            </div>

            <Link href="/menu" className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-brand-orange hover:text-brand-orangeHover font-extrabold text-sm uppercase">
              <span>EXPLORE FULL MENU</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>

        </div>
      </section>

      {/* Customer Testimonials Block */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}
