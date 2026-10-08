'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Download, X, Share, PlusSquare, CheckCircle2 } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Global reference so other buttons (like the footer CTA) can trigger installation
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;

export function triggerPWAInstall() {
  if (globalDeferredPrompt) {
    globalDeferredPrompt.prompt();
    return globalDeferredPrompt.userChoice;
  }
  return null;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // 1. Detect if app is already running in standalone/installed mode
    const checkStandalone = () => {
      const isDisplayStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isNavStandalone = (window.navigator as any).standalone === true;
      return isDisplayStandalone || isNavStandalone;
    };

    if (checkStandalone()) {
      setIsStandalone(true);
      return; // Do not show any install prompt if already installed
    }

    // 2. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // 3. Listen for browser native beforeinstallprompt event (Chrome, Edge, Samsung Internet, Android WebViews)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      globalDeferredPrompt = promptEvent;
      setDeferredPrompt(promptEvent);

      // Check if user previously dismissed prompt
      const dismissed = localStorage.getItem('247flavours_pwa_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    // 4. Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsStandalone(true);
      setShowPrompt(false);
      globalDeferredPrompt = null;
      setDeferredPrompt(null);
      setInstalledSuccess(true);
      setTimeout(() => setInstalledSuccess(false), 4000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // If iOS and not dismissed, show after 3 seconds
    if (isIosDevice) {
      const dismissed = localStorage.getItem('247flavours_pwa_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => setShowPrompt(true), 3500);
        return () => clearTimeout(timer);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setShowPrompt(false);
          setInstalledSuccess(true);
        }
      } catch (err) {
        console.error('Error triggering PWA install:', err);
      } finally {
        globalDeferredPrompt = null;
        setDeferredPrompt(null);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('247flavours_pwa_dismissed', 'true');
  };

  // If already running inside standalone app, hide completely
  if (isStandalone && !installedSuccess) return null;

  return (
    <>
      {/* Toast notification on successful installation */}
      <AnimatePresence>
        {installedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#062D26] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#FFBD3E]/40 flex items-center space-x-2.5 text-xs font-bold"
          >
            <CheckCircle2 size={18} className="text-[#FFBD3E]" />
            <span>24/7 Flavours App Installed Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating In-App Install Prompt Banner */}
      <AnimatePresence>
        {showPrompt && !isStandalone && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            className="fixed bottom-24 md:bottom-6 left-3 right-3 sm:left-6 sm:right-6 md:left-auto md:right-6 md:w-[400px] z-45 bg-[#062D26] text-white p-4 sm:p-5 rounded-3xl shadow-2xl border-2 border-[#FFBD3E]/60 backdrop-blur-xl"
          >
            <button
              onClick={handleDismiss}
              aria-label="Close install prompt"
              className="absolute top-3 right-3 text-gray-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-start space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#BD3C0D] flex items-center justify-center font-display text-2xl text-white shadow-lg flex-shrink-0 border border-white/20">
                24
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FFBD3E]">
                  OFFICIAL PROGRESSIVE WEB APP
                </span>
                <h4 className="font-display text-lg uppercase tracking-tight text-white leading-tight mt-0.5">
                  GET THE 24/7 FLAVOURS APP
                </h4>
                <p className="text-xs text-gray-300 mt-1 leading-snug">
                  Fast ordering, instant re-orders, and smooth full-screen experience directly on your device.
                </p>

                {/* Native PWA Install Action */}
                {deferredPrompt && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleInstallClick}
                    className="mt-3.5 w-full bg-[#BD3C0D] hover:bg-[#A93209] text-white py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all"
                  >
                    <Download size={16} />
                    <span>INSTALL 24/7 FLAVOURS APP</span>
                  </motion.button>
                )}

                {/* iOS Safari Fallback Instructions */}
                {isIOS && !deferredPrompt && (
                  <div className="mt-3 p-3 bg-white/10 rounded-xl text-[11px] text-gray-200 space-y-1.5 border border-white/10">
                    <div className="flex items-center space-x-1.5 font-bold text-[#FFBD3E]">
                      <Share size={14} />
                      <span>Install on iOS / Safari:</span>
                    </div>
                    <p className="leading-tight">
                      1. Tap the <span className="font-bold text-white">Share</span> button at the bottom of Safari.
                    </p>
                    <p className="leading-tight">
                      2. Choose <span className="font-bold text-white">"Add to Home Screen"</span> <PlusSquare size={13} className="inline ml-1 text-[#FFBD3E]" />.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
