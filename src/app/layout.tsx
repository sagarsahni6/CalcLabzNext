import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/layout/ThemeProvider';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import ConsentBanner from '@/components/layout/ConsentBanner';
import BackToTop from '@/components/ui/BackToTop';
import LoadingBar from '@/components/ui/LoadingBar';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import JsonLd from '@/components/seo/JsonLd';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { getGlobalSchemas } from '@/lib/seo/schema';
import Script from 'next/script';

const CommandPalette = dynamic(() => import('@/components/ui/CommandPalette'));

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400'], // Only regular needed for inputs/code — saves ~15KB
});


export const metadata: Metadata = {
  title: 'Calc Labz — 300+ Free Online Calculators | EMI, SIP, GST, BMI & More',
  description: 'Free online calculators for EMI, SIP, GST, BMI, income tax and 300+ more. Instant results, no signup, works offline as a PWA.',
  metadataBase: new URL('https://calclabz.com'),
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Calc Labz — 300+ Free Online Calculators',
    description: 'Free online calculators for EMI, SIP, GST, BMI, income tax and 300+ more. Instant results, no signup.',
    url: 'https://calclabz.com',
    siteName: 'Calc Labz',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Calc Labz — Free Online Calculators' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calc Labz — 300+ Free Online Calculators',
    description: 'Free calculators for EMI, SIP, GST, BMI, income tax and 300+ more.',
    site: '@calclabz',
    creator: '@calclabz',
  },
  alternates: {
    canonical: 'https://calclabz.com',
    languages: {
      'en-IN': 'https://calclabz.com',
      'en': 'https://calclabz.com',
      'x-default': 'https://calclabz.com',
    },
  },
  icons: {
    icon: '/calclabz-logo.png',
    apple: '/icon-192.png',
  },
  // NOTE: Google verification intentionally omitted.
  // Use DNS TXT record verification in Google Search Console instead
  // (it's more reliable and doesn't pollute HTML metadata).
  // Bing verification: add via BingSiteAuth.xml or DNS method.
};

// Global JSON-LD schemas — rendered once for every page via layout.
const globalSchemas = getGlobalSchemas();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${plusJakarta.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Global WebSite + Organization JSON-LD — renders in initial SSR HTML */}
        <JsonLd id="global-schemas" data={globalSchemas} />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('cp_theme');
                  if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', t);
                  if (document.body) document.body.classList.add(t);
                } catch(e) {}
              })();
            `
          }}
        />
        <Script
          id="pwa-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    console.log('SW registered:', reg.scope);
                  }).catch(function(err) {
                    console.warn('SW registration failed:', err);
                  });
                });
              }
            `
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>

          <div className="app-wrapper">
            <Header />
            <LoadingBar />
            <div className="app-body">
              <Sidebar />
              <main id="mainContent">
                {children}
              </main>
            </div>
            <Footer />
            <MobileNav />
          </div>
          <BackToTop />
          <ConsentBanner />
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>

  );
}
