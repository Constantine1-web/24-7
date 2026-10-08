import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { OrderProvider } from '@/context/OrderContext';
import Header from '@/components/Header';
import StickyMobileCart from '@/components/StickyMobileCart';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export const metadata: Metadata = {
  title: '24/7 Flavours | Uyo Urban Kitchen & App',
  description: 'Premium fast-casual urban restaurant ordering application based in Uyo, Nigeria. Open 24/7 for delivery & pickup.',
  manifest: '/manifest.json',
  applicationName: '24/7 Flavours',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '24/7 Flavours',
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#062D26',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#062D26" />
      </head>
      <body className="font-sans bg-brand-parchment text-brand-charcoal antialiased min-h-screen flex flex-col pb-24 sm:pb-28 md:pb-0 relative z-0 w-full max-w-full overflow-x-hidden">
        
        {/* Global Brand Texture & Depth Layer */}
        <div className="global-texture" aria-hidden="true">
          <div className="global-texture-circle-1"></div>
          <div className="global-texture-circle-2"></div>
        </div>

        <OrderProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow w-full max-w-full overflow-x-hidden">{children}</main>
            <CartDrawer />
            <ProductModal />
            <StickyMobileCart />
            <PWAInstallPrompt />
          </CartProvider>
        </OrderProvider>
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then(function(reg) {
                      console.log('[24/7 Flavours] PWA Service Worker registered with scope:', reg.scope);
                    })
                    .catch(function(err) {
                      console.error('[24/7 Flavours] PWA Service Worker registration error:', err);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
