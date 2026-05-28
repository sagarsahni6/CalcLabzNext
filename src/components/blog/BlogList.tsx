'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import Icon from '@/components/ui/Icon';

interface BlogListProps {
  initialPosts: BlogPost[];
}

/* Category → gradient + icon mapping for thumbnails */
const BLOG_CAT_THEME: Record<string, { gradient: string; icon: string }> = {
  finance:   { gradient: 'linear-gradient(135deg, #1E3A5F, #2563EB)', icon: 'fa-landmark' },
  tax:       { gradient: 'linear-gradient(135deg, #1E3A5F, #3B82F6)', icon: 'fa-file-invoice-dollar' },
  health:    { gradient: 'linear-gradient(135deg, #7F1D1D, #DC2626)', icon: 'fa-heartbeat' },
  education: { gradient: 'linear-gradient(135deg, #1E3A5F, #60A5FA)', icon: 'fa-graduation-cap' },
  lifestyle: { gradient: 'linear-gradient(135deg, #713F12, #D97706)', icon: 'fa-lightbulb' },
  everyday:  { gradient: 'linear-gradient(135deg, #78350F, #F59E0B)', icon: 'fa-calculator' },
  math:      { gradient: 'linear-gradient(135deg, #312E81, #6366F1)', icon: 'fa-square-root-variable' },
  science:   { gradient: 'linear-gradient(135deg, #4C1D95, #7C3AED)', icon: 'fa-flask' },
  engineering: { gradient: 'linear-gradient(135deg, #334155, #64748B)', icon: 'fa-gear' },
};

function getCatTheme(cat: string) {
  const key = cat.toLowerCase();
  return BLOG_CAT_THEME[key] || { gradient: 'linear-gradient(135deg, #1E293B, #475569)', icon: 'fa-book' };
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // Dynamically derive categories from data
  const categories = useMemo(() => {
    const cats = initialPosts.map((p) => p.cat);
    const uniqueCats = Array.from(new Set(cats))
      .map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase());
    return ['All', ...uniqueCats.sort()];
  }, [initialPosts]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        post.cat.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.desc.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, search]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage]);

  return (
    <div className="blog-list-container">
      {/* ── Search & Filters ── */}
      <div className="blog-controls">
        <div className="blog-search-wrapper">
          <span className="blog-search-icon">
            <Icon name="fa-search" />
          </span>
          <input
            type="text"
            className="blog-search-input"
            placeholder="Search articles, guides, formulas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="blog-categories-tabs">
          {categories.map((cat) => {
            // Count matching posts for this category
            const count = initialPosts.filter(
              (p) => cat === 'All' || p.cat.toLowerCase() === cat.toLowerCase()
            ).length;

            return (
              <button
                key={cat}
                className={`blog-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results Count ── */}
      <p style={{ color: 'var(--txt2)', fontSize: '0.9rem', marginBottom: '20px' }}>
        Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        {search && ` matching "${search}"`}
      </p>

      {/* ── Grid of Cards ── */}
      {paginatedPosts.length > 0 ? (
        <div className="blog-grid">
          {paginatedPosts.map((post, idx) => {
            const theme = getCatTheme(post.cat);
            const isFeatured = idx === 0 && currentPage === 1 && !search && selectedCategory === 'All';

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`blog-card ${isFeatured ? 'blog-card-featured' : ''}`}
              >
                {/* Thumbnail */}
                <div
                  className="blog-card-thumbnail"
                  style={{ background: theme.gradient }}
                >
                  <div className="blog-card-thumbnail-pattern" />
                  <span className="blog-card-thumbnail-icon">
                    <Icon name={theme.icon} />
                  </span>
                </div>

                {/* Body (wrapped for featured layout) */}
                <div className={isFeatured ? 'blog-card-body' : undefined}>
                  <div className="blog-card-meta">
                    <span className="blog-card-cat">{post.cat}</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-desc">{post.desc}</p>
                  <div className="blog-card-footer">
                    <span style={{ fontSize: '0.78rem', color: 'var(--txt1)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icon name="fa-clock" style={{ width: '14px', height: '14px' }} />
                      {post.readTime} read
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {isFeatured ? 'Read Featured Article' : 'Read Article'}
                      <Icon name="fa-chevron-right" style={{ width: '12px', height: '12px' }} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg2)', borderRadius: 'var(--r-md)', border: '1px solid var(--brd)' }}>
          <Icon name="fa-exclamation" style={{ fontSize: '2.5rem', color: 'var(--txt2)', marginBottom: '16px', display: 'inline-block' }} />
          <h3 style={{ color: 'var(--txt)', fontSize: '1.2rem', marginBottom: '8px' }}>No articles found</h3>
          <p style={{ color: 'var(--txt1)', fontSize: '0.9rem' }}>
            We couldn&apos;t find any guides matching your criteria. Try adjusting your search query.
          </p>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="blog-pagination">
          <button
            className="blog-page-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ color: 'var(--txt1)', fontSize: '0.9rem' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="blog-page-btn"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
