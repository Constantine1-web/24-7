'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Download, X, Share, PlusSquare } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user previously dismissed prompt
      const dismissed = localStorage.getItem('247flavours_pwa_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show prompt on mobile devices if standalone is false
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isIosDevice && !isStandalone) {
      const dismissed = localStorage.getItem('247flavours_pwa_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('247flavours_pwa_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 200 }}
        className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 bg-brand-darkGreen text-white p-5 rounded-3xl shadow-card-elevated border-2 border-brand-yellow"
      >
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-white p-1"
        >
          <X size={18} />
        </button>

        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center font-display text-2xl text-white shadow-md flex-shrink-0">
            24
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-yellow">
              GET THE RESTAURANT APP
            </span>
            <h4 className="font-display text-lg uppercase tracking-tight text-white leading-tight">
              INSTALL 24/7 FLAVOURS
            </h4>
            <p className="text-xs text-gray-300 mt-1 leading-snug">
              Access orders instantly from your phone home screen without opening browser tabs.
            </p>

            {/* Android / Desktop Install Action */}
            {deferredPrompt && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleInstallClick}
                className="mt-3 w-full bg-brand-orange hover:bg-brand-orangeHover text-white py-2.5 px-4 rounded-xl font-extrabold text-xs uppercase flex items-center justify-center space-x-2 shadow-orange-glow transition-all"
              >
                <Download size={16} />
                <span>INSTALL APP NOW</span>
              </motion.button>
            )}

            {/* iOS Safari Installation Instructions */}
            {isIOS && !deferredPrompt && (
              <div className="mt-3 p-2.5 bg-brand-green/80 rounded-xl text-[11px] text-gray-200 space-y-1 border border-brand-lightGreen/50">
                <div className="flex items-center space-x-1.5 font-bold text-brand-yellow">
                  <Share size={13} />
                  <span>To install on iPhone/iPad:</span>
                </div>
                <p>1. Tap the <span className="font-bold text-white">Share</span> icon in Safari</p>
                <p>2. Scroll down &amp; select <span className="font-bold text-white">"Add to Home Screen"</span> <PlusSquare size={12} className="inline ml-1" /></p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
