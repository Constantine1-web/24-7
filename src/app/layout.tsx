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
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '24/7 Flavours',
  },
};

export const viewport: Viewport = {
  themeColor: '#14382B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-brand-parchment text-brand-charcoal antialiased min-h-screen flex flex-col pb-20 md:pb-0 relative z-0">
        
        {/* Global Brand Texture & Depth Layer */}
        <div className="global-texture" aria-hidden="true">
          <div className="global-texture-circle-1"></div>
          <div className="global-texture-circle-2"></div>
        </div>

        <OrderProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">{children}</main>
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
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('24/7 Flavours PWA SW registered:', registration.scope);
                    },
                    function(err) {
                      console.log('24/7 Flavours PWA SW registration failed:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
