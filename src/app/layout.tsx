import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { DB, findCalcBySlug } from '@/data/calculator-db';
import ThemeProvider from '@/components/layout/ThemeProvider';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import ConsentBanner from '@/components/layout/ConsentBanner';
import BackToTop from '@/components/ui/BackToTop';
import LoadingBar from '@/components/ui/LoadingBar';
import dynamic from 'next/dynamic';
const CommandPalette = dynamic(() => import('@/components/ui/CommandPalette'));
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});


export const metadata: Metadata = {
  title: 'Calc Labz — 300+ Free Online Calculators | EMI, SIP, GST, BMI & More',
  description: 'Free online calculators for EMI, SIP, GST, BMI, income tax and 300+ more. Instant results, no signup, works offline as a PWA.',
  metadataBase: new URL('https://calclabz.com'),
  openGraph: {
    title: 'Calc Labz — 300+ Free Online Calculators',
    description: 'Free online calculators for EMI, SIP, GST, BMI, income tax and 300+ more. Instant results, no signup.',
    url: 'https://calclabz.com',
    siteName: 'Calc Labz',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calc Labz — 300+ Free Online Calculators',
    description: 'Free calculators for EMI, SIP, GST, BMI, income tax and 300+ more.',
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
  verification: {
    google: 'google-site-verification-placeholder',
    other: {
      'msvalidate.01': 'bing-verification-placeholder',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const slugMap: Record<string, string | null> = {};
  Object.keys(DB).forEach((id) => {
    const slug = id.toLowerCase().replace(/_/g, '-') + '-calculator';
    slugMap[slug] = id;
  });
  const legacyRedirects = [
    'waisthip-calculator', 'lungcapacity-calculator', 'agenextbday-calculator', 'calories-food-calculator',
    'car-loan-calculator', 'compound-interest-calculator', 'simple-interest-calculator', 'income-tax-calculator',
    'capital-gains-calculator', 'credit-card-calculator', 'tax-regime-calculator', 'step-up-sip-calculator',
    'savings-goal-calculator', 'gold-investment-calculator', 'dividend-yield-calculator', 'stock-return-calculator',
    'loan-eligibility-calculator', 'advance-tax-calculator', 'balance-transfer-calculator', 'loan-affordability-calculator',
    'body-fat-calculator', 'blood-pressure-calculator', 'protein-intake-calculator', 'smoking-cost-calculator',
    'child-height-calculator', 'diabetes-risk-calculator', 'calorie-deficit-calculator', 'in-hand-salary-calculator',
    'ctc-breakup-calculator', 'retirement-corpus-calculator', 'tax-saving-calculator', 'solar-panel-calculator',
    'construction-cost-calculator', 'home-renovation-calculator', 'stamp-duty-calculator', 'professionaltax-calculator',
    'sgb-calculator', 'fo-turnover-calculator', 'presumptive-tax-calculator', 'homeloan-taxbenefit-calculator',
    'indexed-cost-calculator', 'gold-comparison-calculator', 'rent-yield-calculator', 'intermittent-fasting-calculator',
    'waist-height-ratio-calculator', 'cgpa-to-percentage-calculator', 'retirement-date-calculator', 'age-units-calculator',
    'data-usage-calculator'
  ];
  legacyRedirects.forEach((slug) => {
    slugMap[slug] = findCalcBySlug(slug);
  });

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
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
          id="slug-map-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var map = ${JSON.stringify(slugMap)};
                window.findCalcBySlug = function(slug) {
                  return map[slug] || null;
                };
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
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>

  );
}
