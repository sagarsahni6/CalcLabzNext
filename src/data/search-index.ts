/* ═══════════════════════════════════════════════════
   Calc Labz — Lightweight Search Index
   Contains ONLY the metadata needed for CommandPalette search.
   No calc functions, no blog HTML bodies.
   ═══════════════════════════════════════════════════ */

import { DB, getSlugForId } from '@/data/calculator-db';
import { CATEGORY_META } from '@/types/calculator';
import { BLOG_POSTS } from '@/data/blog-db';

export interface SearchEntry {
  type: 'calculator' | 'category' | 'blog';
  id: string;
  name: string;
  desc: string;
  url: string;
  icon: string;
}

// Pre-built search entries — tree-shaking will drop calc functions and blog bodies
// since we only access metadata fields here.

const categoryEntries: SearchEntry[] = Object.entries(CATEGORY_META).map(([key, meta]) => ({
  type: 'category' as const,
  id: key,
  name: `${meta.name} Calculators`,
  desc: meta.description,
  url: `/${key}-calculators`,
  icon: meta.icon,
}));

const calculatorEntries: SearchEntry[] = Object.entries(DB).map(([id, calc]) => ({
  type: 'calculator' as const,
  id,
  name: calc.name,
  desc: calc.desc,
  url: `/${getSlugForId(id)}`,
  icon: calc.icon,
}));

const blogEntries: SearchEntry[] = BLOG_POSTS.map((post) => ({
  type: 'blog' as const,
  id: post.slug,
  name: post.title,
  desc: post.desc,
  url: `/blog/${post.slug}`,
  icon: 'fa-book-open',
}));

export const SEARCH_INDEX: SearchEntry[] = [
  ...categoryEntries,
  ...calculatorEntries,
  ...blogEntries,
];
