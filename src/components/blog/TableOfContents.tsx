'use client';

import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import Icon from '@/components/ui/Icon';

interface TocItem {
  id: string;
  text: string;
  level: 'h2' | 'h3';
}

/* ── Shared context so both mobile + desktop parts share state ── */
interface TocContextValue {
  items: TocItem[];
  activeId: string;
  scrollTo: (id: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const TocContext = createContext<TocContextValue | null>(null);

/* ── Provider — owns the headings extraction + observer ── */
export function TocProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const content = document.querySelector('.blog-content');
    if (!content) return;

    const headings = content.querySelectorAll('h2, h3');
    const tocItems: TocItem[] = [];

    headings.forEach((heading, idx) => {
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

    observerRef.current = new IntersectionObserver(
      (entries) => {
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

  return (
    <TocContext.Provider value={{ items, activeId, scrollTo, mobileOpen, setMobileOpen }}>
      {children}
    </TocContext.Provider>
  );
}

/* ── Shared list renderer ── */
function TocList() {
  const ctx = useContext(TocContext);
  if (!ctx || ctx.items.length < 2) return null;

  return (
    <ul className="toc-list">
      {ctx.items.map((item) => (
        <li key={item.id}>
          <a
            className={`toc-item ${item.level === 'h3' ? 'toc-h3' : ''} ${ctx.activeId === item.id ? 'toc-active' : ''}`}
            onClick={(e) => { e.preventDefault(); ctx.scrollTo(item.id); }}
            href={`#${item.id}`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ── Desktop sidebar (sticky) — render inside the grid column ── */
export function TocDesktop() {
  const ctx = useContext(TocContext);
  if (!ctx || ctx.items.length < 2) return null;

  return (
    <div className="toc-sidebar">
      <div className="toc-widget">
        <div className="toc-widget-title">On This Page</div>
        <TocList />
      </div>
    </div>
  );
}

/* ── Mobile collapsible — render above the article body ── */
export function TocMobile() {
  const ctx = useContext(TocContext);
  if (!ctx || ctx.items.length < 2) return null;

  return (
    <div className="toc-mobile">
      <button
        className={`toc-mobile-toggle ${ctx.mobileOpen ? 'toc-open' : ''}`}
        onClick={() => ctx.setMobileOpen(!ctx.mobileOpen)}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="fa-list" style={{ width: '16px', height: '16px' }} />
          Table of Contents
        </span>
        <span className="toc-chevron">
          <Icon name="fa-chevron-down" style={{ width: '12px', height: '12px' }} />
        </span>
      </button>
      {ctx.mobileOpen && (
        <div className="toc-mobile-list">
          <TocList />
        </div>
      )}
    </div>
  );
}

/* ── Default export (backwards compat) — renders both parts ── */
export default function TableOfContents() {
  return (
    <>
      <TocDesktop />
      <TocMobile />
    </>
  );
}

