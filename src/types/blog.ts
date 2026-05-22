/* ═══════════════════════════════════════════════════
   Calc Labz — Blog Type Definitions
   ═══════════════════════════════════════════════════ */

export interface BlogPostMetadata {
  id: string;
  slug: string;
  cat: string; // "Finance", "Tax", "Health", "Education", "Lifestyle", "Everyday"
  title: string;
  desc: string;
  calc?: string;
  date: string;
  isoDate: string; // ISO-8601 date for OG/JSON-LD (e.g. "2026-05-15")
  readTime: string;
}

export interface BlogPostContent {
  title: string;
  meta: {
    date: string;
    readTime: string;
    author: string;
  };
  body: string; // HTML body contents
  cta?: {
    text: string;
    calc: string;
    cat: string;
  };
}

export interface BlogPost extends BlogPostMetadata {
  content: BlogPostContent;
}
