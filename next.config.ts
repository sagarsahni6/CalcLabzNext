import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build optimizations
  compress: true,

  // Allow mobile device to access dev server over LAN
  allowedDevOrigins: ['192.168.1.96'],

  // Image optimization — prefer modern formats, long cache TTL
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year — images are versioned by hash
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Port rewrites from vercel.json
  async redirects() {
    return [
      // Canonical redirect for legacy construction slug
      { source: '/construction-calculator', destination: '/construction-cost-calculator', permanent: true },
      // Legacy short slugs → canonical hyphenated slugs (301 permanent redirects)
      // These consolidate link equity from any backlinks/bookmarks to old URL formats.
      { source: '/compoundinterest-calculator', destination: '/compound-interest-calculator', permanent: true },
      { source: '/simpleinterest-calculator', destination: '/simple-interest-calculator', permanent: true },
      { source: '/carloan-calculator', destination: '/car-loan-calculator', permanent: true },
      { source: '/creditcard-calculator', destination: '/credit-card-calculator', permanent: true },
      { source: '/stockreturn-calculator', destination: '/stock-return-calculator', permanent: true },
      { source: '/taxregime-calculator', destination: '/tax-regime-calculator', permanent: true },
      { source: '/capitalgains-calculator', destination: '/capital-gains-calculator', permanent: true },
      { source: '/stepupsip-calculator', destination: '/step-up-sip-calculator', permanent: true },
      { source: '/savingsgoal-calculator', destination: '/savings-goal-calculator', permanent: true },
      { source: '/dividendyield-calculator', destination: '/dividend-yield-calculator', permanent: true },
      { source: '/goldinvestment-calculator', destination: '/gold-investment-calculator', permanent: true },
      { source: '/loaneligibility-calculator', destination: '/loan-eligibility-calculator', permanent: true },
      { source: '/balancetransfer-calculator', destination: '/balance-transfer-calculator', permanent: true },
      { source: '/advancetax-calculator', destination: '/advance-tax-calculator', permanent: true },
      { source: '/inhandsalary-calculator', destination: '/in-hand-salary-calculator', permanent: true },
      { source: '/ctcbreakup-calculator', destination: '/ctc-breakup-calculator', permanent: true },
      { source: '/taxsaving-calculator', destination: '/tax-saving-calculator', permanent: true },
      { source: '/retirementcorpus-calculator', destination: '/retirement-corpus-calculator', permanent: true },
      { source: '/bloodpressure-calculator', destination: '/blood-pressure-calculator', permanent: true },
      { source: '/bodyfat-calculator', destination: '/body-fat-calculator', permanent: true },
      { source: '/proteinintake-calculator', destination: '/protein-intake-calculator', permanent: true },
      { source: '/smokingcost-calculator', destination: '/smoking-cost-calculator', permanent: true },
      { source: '/childheight-calculator', destination: '/child-height-calculator', permanent: true },
      { source: '/diabetesrisk-calculator', destination: '/diabetes-risk-calculator', permanent: true },
      { source: '/caloriedeficit-calculator', destination: '/calorie-deficit-calculator', permanent: true },
      { source: '/loanaffordability-calculator', destination: '/loan-affordability-calculator', permanent: true },
      { source: '/caloriesfood-calculator', destination: '/calories-food-calculator', permanent: true },
      { source: '/stampdutycalc-calculator', destination: '/stamp-duty-calculator', permanent: true },
      { source: '/constructioncost-calculator', destination: '/construction-cost-calculator', permanent: true },
      { source: '/solarpanel-calculator', destination: '/solar-panel-calculator', permanent: true },
      { source: '/homerenovation-calculator', destination: '/home-renovation-calculator', permanent: true },
      { source: '/proftax-calculator', destination: '/professionaltax-calculator', permanent: true },
      { source: '/foturnover-calculator', destination: '/fo-turnover-calculator', permanent: true },
      { source: '/presumptivetax-calculator', destination: '/presumptive-tax-calculator', permanent: true },
      { source: '/homeloantaxbenefit-calculator', destination: '/homeloan-taxbenefit-calculator', permanent: true },
      { source: '/indexedcost-calculator', destination: '/indexed-cost-calculator', permanent: true },
      { source: '/goldcomparison-calculator', destination: '/gold-comparison-calculator', permanent: true },
      { source: '/rentyield-calculator', destination: '/rent-yield-calculator', permanent: true },
      { source: '/intermittentfasting-calculator', destination: '/intermittent-fasting-calculator', permanent: true },
      { source: '/waistheightratio-calculator', destination: '/waist-height-ratio-calculator', permanent: true },
      { source: '/cgpatopercentage-calculator', destination: '/cgpa-to-percentage-calculator', permanent: true },
      { source: '/retirementdate-calculator', destination: '/retirement-date-calculator', permanent: true },
      { source: '/ageunits-calculator', destination: '/age-units-calculator', permanent: true },
      { source: '/datausage-calculator', destination: '/data-usage-calculator', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), usb=(), payment=(), browsing-topics=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://ssl.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
              "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://pagead2.googlesyndication.com https://www.googleadservices.com",
              "frame-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/(icon-192.png|icon-512.png|calclabz-logo.png|manifest.json)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache static HTML pages at CDN level for 1 day, serve stale for 7 days while revalidating
        source: '/:path((?!api|_next|sw\\.js).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
