import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow importing JSON files (for calculator-registry.json)
  // Enable static export for Vercel deployment with full SSG
  output: 'standalone',

  // Allow mobile device to access dev server over LAN
  allowedDevOrigins: ['192.168.1.96'],

  // Port rewrites from vercel.json
  async redirects() {
    return [
      { source: '/construction-calculator', destination: '/construction-cost-calculator', permanent: true },
    ];
  },

  async rewrites() {
    return [
      { source: '/compoundinterest-calculator', destination: '/compound-interest-calculator' },
      { source: '/simpleinterest-calculator', destination: '/simple-interest-calculator' },
      { source: '/incometax-calculator', destination: '/incometax-calculator' },
      { source: '/carloan-calculator', destination: '/car-loan-calculator' },
      { source: '/creditcard-calculator', destination: '/credit-card-calculator' },
      { source: '/stockreturn-calculator', destination: '/stock-return-calculator' },
      { source: '/taxregime-calculator', destination: '/tax-regime-calculator' },
      { source: '/capitalgains-calculator', destination: '/capital-gains-calculator' },
      { source: '/stepupsip-calculator', destination: '/step-up-sip-calculator' },
      { source: '/savingsgoal-calculator', destination: '/savings-goal-calculator' },
      { source: '/dividendyield-calculator', destination: '/dividend-yield-calculator' },
      { source: '/goldinvestment-calculator', destination: '/gold-investment-calculator' },
      { source: '/loaneligibility-calculator', destination: '/loan-eligibility-calculator' },
      { source: '/balancetransfer-calculator', destination: '/balance-transfer-calculator' },
      { source: '/advancetax-calculator', destination: '/advance-tax-calculator' },
      { source: '/inhandsalary-calculator', destination: '/in-hand-salary-calculator' },
      { source: '/ctcbreakup-calculator', destination: '/ctc-breakup-calculator' },
      { source: '/taxsaving-calculator', destination: '/tax-saving-calculator' },
      { source: '/retirementcorpus-calculator', destination: '/retirement-corpus-calculator' },
      { source: '/bloodpressure-calculator', destination: '/blood-pressure-calculator' },
      { source: '/bodyfat-calculator', destination: '/body-fat-calculator' },
      { source: '/proteinintake-calculator', destination: '/protein-intake-calculator' },
      { source: '/smokingcost-calculator', destination: '/smoking-cost-calculator' },
      { source: '/childheight-calculator', destination: '/child-height-calculator' },
      { source: '/diabetesrisk-calculator', destination: '/diabetes-risk-calculator' },
      { source: '/caloriedeficit-calculator', destination: '/calorie-deficit-calculator' },
      { source: '/loanaffordability-calculator', destination: '/loan-affordability-calculator' },
      { source: '/caloriesfood-calculator', destination: '/calories-food-calculator' },
      { source: '/stampdutycalc-calculator', destination: '/stamp-duty-calculator' },
      { source: '/constructioncost-calculator', destination: '/construction-cost-calculator' },
      { source: '/solarpanel-calculator', destination: '/solar-panel-calculator' },
      { source: '/homerenovation-calculator', destination: '/home-renovation-calculator' },
      { source: '/proftax-calculator', destination: '/professionaltax-calculator' },
      { source: '/foturnover-calculator', destination: '/fo-turnover-calculator' },
      { source: '/presumptivetax-calculator', destination: '/presumptive-tax-calculator' },
      { source: '/homeloantaxbenefit-calculator', destination: '/homeloan-taxbenefit-calculator' },
      { source: '/indexedcost-calculator', destination: '/indexed-cost-calculator' },
      { source: '/goldcomparison-calculator', destination: '/gold-comparison-calculator' },
      { source: '/rentyield-calculator', destination: '/rent-yield-calculator' },
      { source: '/intermittentfasting-calculator', destination: '/intermittent-fasting-calculator' },
      { source: '/waistheightratio-calculator', destination: '/waist-height-ratio-calculator' },
      { source: '/cgpatopercentage-calculator', destination: '/cgpa-to-percentage-calculator' },
      { source: '/retirementdate-calculator', destination: '/retirement-date-calculator' },
      { source: '/ageunits-calculator', destination: '/age-units-calculator' },
      { source: '/datausage-calculator', destination: '/data-usage-calculator' },
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
    ];
  },
};

export default nextConfig;
