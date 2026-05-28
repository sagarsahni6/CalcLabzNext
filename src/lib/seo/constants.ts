/* ═══════════════════════════════════════════════════
   Calc Labz — SEO Constants
   Single source of truth for all SEO-related values.
   ═══════════════════════════════════════════════════ */

export const SEO = {
  BASE_URL: 'https://calclabz.com',
  SITE_NAME: 'Calc Labz',
  SITE_DESCRIPTION: 'Free online calculators for EMI, SIP, GST, BMI, income tax and 300+ more. Instant results, no signup, works offline as a PWA.',
  DEFAULT_OG_IMAGE: '/og-image.png',
  LOGO_URL: '/calclabz-logo.png',
  CURRENT_YEAR: new Date().getFullYear(),
  LAST_CONTENT_UPDATE: '2026-05-22',

  AUTHOR: {
    name: 'Sagar Sahni',
    url: 'https://calclabz.com/author/sagar-sahni',
    jobTitle: 'Founder & Editor',
  },

  SOCIAL: {
    twitter: '@calclabz',
    github: 'https://github.com/sagarsahni6',
  },

  ORG: {
    name: 'Calc Labz',
    email: 'support@calclabz.com',
    foundingDate: '2024',
  },
} as const;
