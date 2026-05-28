'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Icon from '@/components/ui/Icon';

interface TocItem {
  id: string;
  text: string;
  level: 'h2' | 'h3';
}

export default function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Extract headings from .blog-content on mount
  useEffect(() => {
    const content = document.querySelector('.blog-content');
    if (!content) return;

    const headings = content.querySelectorAll('h2, h3');
    const tocItems: TocItem[] = [];

    headings.forEach((heading, idx) => {
      // Assign an ID if missing
      if (!heading.id) {
        heading.id = `toc-${idx}-${heading.textContent?.slice(0, 30).replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase() || idx}`;
      }
      tocItems.push({
        id: heading.id,
        text: heading.textContent || '',
        level: heading.tagName.toLowerCase() as 'h2' | 'h3',
      });
    });

    setItems(tocItems);

    // Set up intersection observer for active highlighting
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is visible
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      observerRef.current?.observe(heading);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveId(id);
      setMobileOpen(false);
    }
  }, []);

  if (items.length < 2) return null;

  const tocList = (
    <ul className="toc-list">
      {items.map((item) => (
        <li key={item.id}>
          <a
            className={`toc-item ${item.level === 'h3' ? 'toc-h3' : ''} ${activeId === item.id ? 'toc-active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
            href={`#${item.id}`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="toc-sidebar">
        <div className="toc-widget">
          <div className="toc-widget-title">On This Page</div>
          {tocList}
        </div>
      </div>

      {/* Mobile: collapsible */}
      <div className="toc-mobile">
        <button
          className={`toc-mobile-toggle ${mobileOpen ? 'toc-open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="fa-list" style={{ width: '16px', height: '16px' }} />
            Table of Contents
          </span>
          <span className="toc-chevron">
            <Icon name="fa-chevron-down" style={{ width: '12px', height: '12px' }} />
          </span>
        </button>
        {mobileOpen && (
          <div className="toc-mobile-list">
            {tocList}
          </div>
        )}
      </div>
    </>
  );
}
