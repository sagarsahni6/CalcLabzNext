import React from 'react';
import { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blog-db';
import BlogList from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'Calc Labz Blog — Financial, Tax & Health Calculator Guides',
  description: 'Read expert-written guides on using calculators for home loans, SIP investments, income tax filing, BMI tracking, and other everyday calculations in India.',
  openGraph: {
    title: 'Calc Labz Blog — Financial, Tax & Health Calculator Guides',
    description: 'Expert-written guides on using calculators for home loans, SIP investments, income tax filing, BMI tracking, and more.',
    url: 'https://calclabz.com/blog',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  // Sort posts by date descending if we want, or keep database order (already sorted or precompiled).
  // Let's just pass them straight.
  return (
    <>
      <section className="blog-hero">
        <div 
          className="hero-eyebrow" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            background: 'var(--bg3)', 
            border: '1px solid var(--brd)', 
            padding: '6px 14px', 
            borderRadius: '20px', 
            fontSize: '0.8rem', 
            fontWeight: 600, 
            color: 'var(--p2)', 
            marginBottom: '16px' 
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent2)', display: 'inline-block' }}></span>
          Calc Labz Learning Center
        </div>
        <h1>Expert Guides &amp; Calculator Resources</h1>
        <p>
          Master your money, plan your taxes, optimize health goals, and solve everyday equations with detailed guides and formulas.
        </p>
      </section>

      <BlogList initialPosts={BLOG_POSTS} />
    </>
  );
}
