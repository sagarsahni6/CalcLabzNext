import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getPostBySlug, getRelatedPosts, BLOG_POSTS } from '@/data/blog-db';
import { DB, getSlugForId } from '@/data/calculator-db';
import { CATEGORY_META, CalculatorCategory } from '@/types/calculator';
import Icon from '@/components/ui/Icon';
import ReadingProgressBar from '@/components/blog/ReadingProgressBar';
import BlogFeedback from '@/components/blog/BlogFeedback';
import TableOfContents from '@/components/blog/TableOfContents';

interface Props {
  params: Promise<{ slug: string }>;
}

// ── STATIC GENERATION ─────────────────────────────
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// ── DYNAMIC METADATA ──────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Guide Not Found — Calc Labz',
      description: 'The requested guide could not be found.',
    };
  }

  const title = `${post.title} — Calc Labz`;
  const description = post.desc;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://calclabz.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.isoDate,
      authors: [post.content.meta.author],
      siteName: 'Calc Labz',
    },
    alternates: {
      canonical: `https://calclabz.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);

  // Schema Markup (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.desc,
    'datePublished': post.isoDate,
    'author': {
      '@type': 'Organization',
      'name': post.content.meta.author || 'Calc Labz Team',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Calc Labz',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://calclabz.com/calclabz-logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://calclabz.com/blog/${post.slug}`,
    },
  };

  // Resolve CTA Calculator Details
  const ctaCalcId = post.content.cta?.calc || post.calc;
  const ctaCalc = ctaCalcId ? DB[ctaCalcId] : null;
  const ctaMeta = ctaCalc ? CATEGORY_META[ctaCalc.cat] : null;
  const ctaUrl = ctaCalcId ? `/${getSlugForId(ctaCalcId)}` : null;

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Schema Script Injection */}
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="article-layout">
        {/* ── Main Content Area ── */}
        <article className="article-main">
          {/* Back button */}
          <Link href="/blog" className="article-back-link">
            <Icon name="fa-arrow-left" style={{ width: '14px', height: '14px' }} />
            Back to Articles
          </Link>

          {/* Hero Meta */}
          <div className="article-hero">
            <span className="article-cat-badge">{post.cat}</span>
            <h1 className="article-title">{post.title}</h1>
            <div className="article-meta">
              <span>
                <Icon name="fa-calendar-days" style={{ width: '16px', height: '16px' }} />
                Published: {post.content.meta.date}
              </span>
              <span>
                <Icon name="fa-clock" style={{ width: '16px', height: '16px' }} />
                {post.content.meta.readTime} read
              </span>
              <span>
                <Icon name="fa-user-tie" style={{ width: '16px', height: '16px' }} />
                By{' '}
                {post.content.meta.author === 'Sagar Sahni' ? (
                  <Link href="/author/sagar-sahni" style={{ color: 'var(--p2)', fontWeight: 600, textDecoration: 'none' }}>
                    Sagar Sahni
                  </Link>
                ) : (
                  post.content.meta.author
                )}
              </span>
            </div>
          </div>

          {/* Mobile Table of Contents (collapsible) */}
          <TableOfContents />

          {/* Body content wrapper with optional ToC sidebar */}
          <div className="article-body-wrapper">
            <div className="article-layout-with-toc">
              <div>
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: post.content.body }}
                />

                {/* In-content CTA box */}
                {ctaCalc && ctaUrl && (
                  <div 
                    className="cta-box" 
                    style={{ 
                      marginTop: '40px',
                      borderLeft: `4px solid ${ctaMeta?.color ? ctaMeta.color.match(/#[0-9a-fA-F]{6}/)?.[0] || 'var(--p)' : 'var(--p)'}` 
                    }}
                  >
                    <div className="cta-box-title">
                      {post.content.cta?.text || `Try the ${ctaCalc.name}`}
                    </div>
                    <div className="cta-box-desc">
                      {ctaCalc.desc}
                    </div>
                    <Link href={ctaUrl} className="cta-box-btn">
                      Use Calculator Now
                    </Link>
                  </div>
                )}

                {/* Blog Feedback Widget */}
                <BlogFeedback slug={slug} />
              </div>
            </div>
          </div>
        </article>

        {/* ── Sidebar Widget Area ── */}
        <aside className="blog-sidebar">
          {/* Active Calculator Widget */}
          {ctaCalc && ctaUrl && (
            <div className="sidebar-widget">
              <h3 className="widget-title">
                <Icon name="fa-calculator" style={{ color: 'var(--p2)' }} />
                Featured Tool
              </h3>
              <div className="calc-widget-list">
                <Link href={ctaUrl} className="calc-widget-item">
                  <div 
                    className="calc-widget-icon"
                    style={{ background: ctaMeta?.color || 'var(--p)' }}
                  >
                    <Icon name={ctaCalc.icon} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="calc-widget-name">{ctaCalc.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--txt2)' }}>
                      Free Instant Calculation
                    </div>
                  </div>
                  <Icon name="fa-chevron-right" style={{ width: '12px', height: '12px', color: 'var(--txt2)' }} />
                </Link>
              </div>
            </div>
          )}

          {/* Quick Calculators List */}
          <div className="sidebar-widget">
            <h3 className="widget-title">
              <Icon name="fa-fire" style={{ color: 'var(--p2)' }} />
              Popular Calculators
            </h3>
            <div className="calc-widget-list">
              {[
                { id: 'emi', name: 'EMI Calculator', icon: 'fa-car', cat: 'finance' },
                { id: 'sip', name: 'SIP Calculator', icon: 'fa-piggy-bank', cat: 'finance' },
                { id: 'gst', name: 'GST Calculator', icon: 'fa-file-invoice-dollar', cat: 'finance' },
                { id: 'incometax', name: 'Income Tax Calculator', icon: 'fa-landmark', cat: 'finance' }
              ].map((item) => {
                const meta = CATEGORY_META[item.cat as CalculatorCategory];
                return (
                  <Link key={item.id} href={`/${getSlugForId(item.id)}`} className="calc-widget-item">
                    <div 
                      className="calc-widget-icon"
                      style={{ background: meta?.color || 'var(--p)' }}
                    >
                      <Icon name={item.icon} />
                    </div>
                    <div className="calc-widget-name">{item.name}</div>
                    <Icon name="fa-chevron-right" style={{ width: '12px', height: '12px', color: 'var(--txt2)', marginLeft: 'auto' }} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Related Articles Widget */}
          {relatedPosts.length > 0 && (
            <div className="sidebar-widget">
              <h3 className="widget-title">
                <Icon name="fa-book-open" style={{ color: 'var(--p2)' }} />
                Related Guides
              </h3>
              <div className="related-posts-list">
                {relatedPosts.map((rPost) => (
                  <div key={rPost.id} className="related-post-item">
                    <Link href={`/blog/${rPost.slug}`} className="related-post-link">
                      {rPost.title}
                    </Link>
                    <div className="related-post-meta">
                      {rPost.cat} • {rPost.readTime} read
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
