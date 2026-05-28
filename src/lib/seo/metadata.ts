/* ═══════════════════════════════════════════════════
   Calc Labz — Centralized Metadata Factory
   Generates unique, SEO-optimized metadata for every
   page type. Eliminates duplicate metadata logic.
   ═══════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import { SEO } from './constants';

interface MetadataInput {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: { name: string; url: string }[];
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Base metadata generator — all page-type generators delegate to this.
 * Produces complete Metadata with OG, Twitter, canonical, robots, hreflang.
 */
export function generatePageMetadata(input: MetadataInput): Metadata {
  const url = `${SEO.BASE_URL}${input.path}`;

  return {
    title: input.title,
    description: input.description,
    authors: input.authors,
    metadataBase: new URL(SEO.BASE_URL),
    robots: {
      index: !input.noIndex,
      follow: true,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SEO.SITE_NAME,
      type: input.type || 'website',
      images: [
        {
          url: input.ogImage || SEO.DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
      ...(input.publishedTime && { publishedTime: input.publishedTime }),
      ...(input.modifiedTime && { modifiedTime: input.modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      site: SEO.SOCIAL.twitter,
      creator: SEO.SOCIAL.twitter,
    },
    alternates: {
      canonical: url,
      languages: {
        'en-IN': url,
        'x-default': url,
      },
    },
  };
}

/**
 * Calculator page metadata.
 * Formula: "{Calculator Name} Online ({Year}) — Free {Category} Calculator India | Calc Labz"
 */
export function generateCalculatorMetadata(
  calcName: string,
  calcDesc: string,
  slug: string,
  categoryName: string,
  registryTitle?: string,
  registryDesc?: string,
): Metadata {
  const title = registryTitle || `${calcName} Online (${SEO.CURRENT_YEAR}) — Free ${categoryName} Calculator India | ${SEO.SITE_NAME}`;
  const description = registryDesc || `Free ${calcName.toLowerCase()} — ${calcDesc}. Instant results, verified formulas, no signup. Best online ${calcName.toLowerCase()} on ${SEO.SITE_NAME}.`;

  return generatePageMetadata({
    title,
    description,
    path: `/${slug}`,
    type: 'website',
    authors: [{ name: SEO.AUTHOR.name, url: SEO.AUTHOR.url }],
    modifiedTime: `${SEO.LAST_CONTENT_UPDATE}T00:00:00Z`,
  });
}

/**
 * Category listing page metadata.
 * Formula: "Best {Category} Calculators Online ({Year}) — Free & Offline | Calc Labz"
 */
export function generateCategoryMetadata(
  catName: string,
  catDesc: string,
  slug: string,
): Metadata {
  const title = `Best ${catName} Calculators Online (${SEO.CURRENT_YEAR}) — Free & Offline | ${SEO.SITE_NAME}`;
  const description = `Access our complete suite of free online ${catName.toLowerCase()} calculators. ${catDesc}. 100% free, instant results, works offline as a PWA.`;

  return generatePageMetadata({
    title,
    description,
    path: `/${slug}`,
  });
}

/**
 * Blog post metadata.
 * Formula: "{Post Title} — Calc Labz"
 */
export function generateBlogMetadata(
  postTitle: string,
  postDesc: string,
  slug: string,
  publishedDate: string,
  authorName: string,
): Metadata {
  return generatePageMetadata({
    title: `${postTitle} — ${SEO.SITE_NAME}`,
    description: postDesc,
    path: `/blog/${slug}`,
    type: 'article',
    publishedTime: publishedDate,
    modifiedTime: publishedDate,
    authors: [{ name: authorName, url: SEO.AUTHOR.url }],
  });
}
