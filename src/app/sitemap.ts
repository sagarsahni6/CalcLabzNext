import { MetadataRoute } from 'next';
import { getAllCalculatorSlugs } from '@/data/calculator-db';
import { CATEGORY_META } from '@/types/calculator';
import { BLOG_POSTS } from '@/data/blog-db';
import { SEO } from '@/lib/seo/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO.BASE_URL;

  // Stable last-modified date for calculators — update when content genuinely changes.
  // Using a fixed date prevents Google from seeing false "changed" signals every build.
  const CALC_LAST_MODIFIED = new Date(SEO.LAST_CONTENT_UPDATE);

  // 1. Core static routes — with proper priorities per the SEO plan
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: CALC_LAST_MODIFIED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: CALC_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: CALC_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/author/sagar-sahni`, lastModified: CALC_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: CALC_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: CALC_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: CALC_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/disclaimer`, lastModified: CALC_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/editorial-policy`, lastModified: CALC_LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.5 },
    // Dashboard excluded — user-specific content with no SEO value
  ];

  // 2. Category calculator list pages — high priority hub pages
  const categoryRoutes: MetadataRoute.Sitemap = Object.keys(CATEGORY_META).map((catKey) => ({
    url: `${baseUrl}/${catKey}-calculators`,
    lastModified: CALC_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 3. Dynamic calculator pages — money pages, highest priority after home
  const calcRoutes: MetadataRoute.Sitemap = getAllCalculatorSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: CALC_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 4. Dynamic blog post pages — use per-post isoDate as lastModified
  const blogPostRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    // Use the actual post date for per-post freshness signals
    lastModified: post.isoDate ? new Date(post.isoDate) : CALC_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...calcRoutes, ...blogPostRoutes];
}
