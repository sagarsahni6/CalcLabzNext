/* ═══════════════════════════════════════════════════
   Calc Labz — Centralized JSON-LD Schema Generators
   All structured data for SEO rich results.
   Rendered via raw <script type="application/ld+json">
   NOT via next/Script, to ensure initial SSR HTML.
   ═══════════════════════════════════════════════════ */

import { SEO } from './constants';

// ── GLOBAL SCHEMAS (rendered in layout.tsx) ──────────

/**
 * Returns WebSite + Organization schemas for the root layout.
 * These are rendered on every page for sitelinks search box eligibility.
 */
export function getGlobalSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SEO.SITE_NAME,
      url: SEO.BASE_URL,
      description: SEO.SITE_DESCRIPTION,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SEO.BASE_URL}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SEO.ORG.name,
      url: SEO.BASE_URL,
      logo: `${SEO.BASE_URL}${SEO.LOGO_URL}`,
      foundingDate: SEO.ORG.foundingDate,
      founder: {
        '@type': 'Person',
        name: SEO.AUTHOR.name,
        url: SEO.AUTHOR.url,
        jobTitle: SEO.AUTHOR.jobTitle,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: SEO.ORG.email,
        contactType: 'customer support',
        availableLanguage: ['English', 'Hindi'],
      },
      sameAs: [SEO.SOCIAL.github],
    },
  ];
}

// ── HOME PAGE SCHEMAS ────────────────────────────────

/**
 * SoftwareApplication schema for the home page.
 * NOTE: aggregateRating intentionally omitted — fabricated ratings
 * risk a Google manual action under spam policies.
 */
export function getHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SEO.SITE_NAME,
    url: SEO.BASE_URL,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web, Android, iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    author: {
      '@type': 'Person',
      name: SEO.AUTHOR.name,
      url: SEO.AUTHOR.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO.ORG.name,
      url: SEO.BASE_URL,
    },
  };
}

// ── CALCULATOR PAGE SCHEMAS ──────────────────────────

interface CalculatorSchemaOpts {
  name: string;
  desc: string;
  slug: string;
  category: string;
  faqs: { q: string; a: string }[];
  breadcrumbs: { name: string; url: string }[];
  howToSteps: { name: string; text: string }[];
  featureList?: string[];
}

/**
 * Returns an array of JSON-LD objects for a calculator page:
 * WebApplication + BreadcrumbList + FAQPage + HowTo
 */
export function getCalculatorSchemas(opts: CalculatorSchemaOpts) {
  return [
    // WebApplication
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${opts.name} - ${SEO.SITE_NAME}`,
      description: opts.desc,
      url: `${SEO.BASE_URL}/${opts.slug}`,
      applicationCategory: opts.category,
      operatingSystem: 'Web',
      browserRequirements: 'Requires JavaScript',
      softwareVersion: String(SEO.CURRENT_YEAR),
      inLanguage: 'en-IN',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      featureList: opts.featureList || [
        'Instant calculation with real-time updates',
        'No signup or registration required',
        'Works offline as PWA',
        'Data stays on your device — 100% private',
        `Verified formulas updated for ${SEO.CURRENT_YEAR}`,
      ],
      author: {
        '@type': 'Person',
        name: SEO.AUTHOR.name,
        url: SEO.AUTHOR.url,
        jobTitle: SEO.AUTHOR.jobTitle,
      },
      publisher: {
        '@type': 'Organization',
        name: SEO.ORG.name,
        url: SEO.BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SEO.BASE_URL}${SEO.LOGO_URL}`,
        },
      },
      datePublished: '2024-01-01',
      dateModified: `${SEO.LAST_CONTENT_UPDATE}`,
      screenshot: `${SEO.BASE_URL}${SEO.DEFAULT_OG_IMAGE}`,
    },
    // BreadcrumbList
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: opts.breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    },
    // FAQPage
    ...(opts.faqs.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: opts.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]
      : []),
    // HowTo
    ...(opts.howToSteps.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: `How to Use the ${opts.name}`,
            description: `Step-by-step guide to using the free ${opts.name.toLowerCase()} on ${SEO.SITE_NAME}.`,
            totalTime: 'PT1M',
            tool: { '@type': 'HowToTool', name: 'Web browser' },
            step: opts.howToSteps.map((s, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: s.name,
              text: s.text,
            })),
          },
        ]
      : []),
  ];
}

// ── ENGINEERING CALCULATOR SCHEMAS ───────────────────

interface EngineeringSchemaOpts {
  name: string;
  desc: string;
  slug: string;
  formulaExpression?: string;
}

/**
 * Returns a MathSolver JSON-LD schema for engineering calculator pages.
 * This helps Google understand the mathematical nature of the calculator
 * and may enable rich results for math-related queries.
 */
export function getEngineeringSchemas(opts: EngineeringSchemaOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MathSolver',
    name: `${opts.name} - ${SEO.SITE_NAME}`,
    description: opts.desc,
    url: `${SEO.BASE_URL}/${opts.slug}`,
    potentialAction: {
      '@type': 'SolveMathAction',
      target: `${SEO.BASE_URL}/${opts.slug}`,
      mathExpression: opts.formulaExpression || opts.desc,
      eduQuestionType: 'Calculation',
    },
    mathExpression: opts.formulaExpression || opts.desc,
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    creator: {
      '@type': 'Organization',
      name: SEO.ORG.name,
      url: SEO.BASE_URL,
    },
  };
}

// ── CATEGORY PAGE SCHEMAS ────────────────────────────

interface CategorySchemaOpts {
  catName: string;
  catDesc: string;
  slug: string;
  calcs: { id: string; name: string; desc: string; url: string }[];
  faqs?: { q: string; a: string }[];
}

export function getCategorySchemas(opts: CategorySchemaOpts) {
  return [
    // CollectionPage + ItemList
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${opts.catName} Calculators - ${SEO.SITE_NAME}`,
      description: `Free online ${opts.catName.toLowerCase()} calculators. ${opts.catDesc}`,
      url: `${SEO.BASE_URL}/${opts.slug}`,
      isPartOf: {
        '@type': 'WebSite',
        name: SEO.SITE_NAME,
        url: SEO.BASE_URL,
      },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: opts.calcs.length,
        itemListElement: opts.calcs.slice(0, 50).map((calc, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: calc.name,
          description: calc.desc,
          url: calc.url,
        })),
      },
    },
    // BreadcrumbList
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SEO.BASE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: `${opts.catName} Calculators`,
          item: `${SEO.BASE_URL}/${opts.slug}`,
        },
      ],
    },
    // FAQPage (optional)
    ...(opts.faqs && opts.faqs.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: opts.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]
      : []),
  ];
}

// ── BLOG POST SCHEMA ─────────────────────────────────

interface BlogSchemaOpts {
  title: string;
  desc: string;
  slug: string;
  isoDate: string;
  authorName: string;
  /** Approximate word count of the blog body (stripped of HTML tags) */
  wordCount?: number;
  /** URL of the blog's featured image */
  image?: string;
}

export function getBlogSchema(opts: BlogSchemaOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.desc,
    datePublished: opts.isoDate,
    dateModified: opts.isoDate,
    author: {
      '@type': 'Person',
      name: opts.authorName,
      url: SEO.AUTHOR.url,
      jobTitle: SEO.AUTHOR.jobTitle,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO.ORG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO.BASE_URL}${SEO.LOGO_URL}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SEO.BASE_URL}/blog/${opts.slug}`,
    },
    url: `${SEO.BASE_URL}/blog/${opts.slug}`,
    image: opts.image || `${SEO.BASE_URL}${SEO.DEFAULT_OG_IMAGE}`,
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
    inLanguage: 'en-IN',
  };
}
