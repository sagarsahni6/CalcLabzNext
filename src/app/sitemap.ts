import { MetadataRoute } from 'next';
import { getAllCalculatorSlugs } from '@/data/calculator-db';
import { CATEGORY_META } from '@/types/calculator';
import { BLOG_POSTS } from '@/data/blog-db';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calclabz.com';

  // Stable last-modified date — update this when calculators are genuinely changed.
  // Using a fixed date prevents Google from seeing false "changed" signals every build.
  const LAST_CONTENT_UPDATE = new Date('2026-05-22');

  // 1. Core static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/editorial-policy',
    '/dashboard',
    '/blog',
    '/author/sagar-sahni',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.7,
  }));

  // 2. Category calculators list pages (e.g. /finance-calculators)
  const categoryRoutes = Object.keys(CATEGORY_META).map((catKey) => ({
    url: `${baseUrl}/${catKey}-calculators`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 3. Dynamic calculator pages — these are our money pages, highest priority after home
  const calcRoutes = getAllCalculatorSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 4. Dynamic blog post pages (e.g. /blog/emi-calculator-guide-india-2026)
  const blogPostRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...calcRoutes, ...blogPostRoutes];
}

