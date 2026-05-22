'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { SearchEntry } from '@/data/search-index';
import Icon from '@/components/ui/Icon';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Lazily loaded search index — only fetched when the palette is first opened
  const indexRef = useRef<SearchEntry[] | null>(null);
  const indexLoadingRef = useRef(false);

  // Search against a given index array
  const performSearchFromIndex = useCallback((q: string, index: SearchEntry[]) => {
    if (q.trim().length < 2) {
      setResults([]);
      setActiveIndex(0);
      return;
    }

    const lower = q.toLowerCase();
    const matches = index.filter(
      (entry) =>
        entry.name.toLowerCase().includes(lower) ||
        entry.desc.toLowerCase().includes(lower)
    );

    // Sort: categories first, then calculators, then blogs — take top 10
    const order = { category: 0, calculator: 1, blog: 2 };
    matches.sort((a, b) => order[a.type] - order[b.type]);
    setResults(matches.slice(0, 10));
    setActiveIndex(0);
  }, []);

  // Load the search index on first open
  useEffect(() => {
    if (isOpen && !indexRef.current && !indexLoadingRef.current) {
      indexLoadingRef.current = true;
      import('@/data/search-index').then((mod) => {
        indexRef.current = mod.SEARCH_INDEX;
        indexLoadingRef.current = false;
        // If user already typed something while loading, re-run search
        if (query.trim().length >= 2) {
          performSearchFromIndex(query, mod.SEARCH_INDEX);
        }
      });
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Global key listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen to custom event to open palette (e.g. from MobileNav or search icons)
  useEffect(() => {
    const handleOpenPalette = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-cmd-palette', handleOpenPalette);
    return () => window.removeEventListener('open-cmd-palette', handleOpenPalette);
  }, []);

  // Focus input when opened, clean up on close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset state when closing
  const closeAndReset = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setActiveIndex(0);
  }, []);


  // Perform search using the loaded index
  const performSearch = useCallback((q: string) => {
    if (!indexRef.current) return;
    performSearchFromIndex(q, indexRef.current);
  }, [performSearchFromIndex]);

  const handleSearchChange = useCallback((q: string) => {
    setQuery(q);
    performSearch(q);
  }, [performSearch]);

  // Navigate selection using arrows and enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeAndReset();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0 && results[activeIndex]) {
        router.push(results[activeIndex].url);
        closeAndReset();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const activeEl = resultsRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex, results]);

  if (!isOpen) return null;

  return (
    <div
      onClick={closeAndReset}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(12px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
      }}
      className="animate-fade-in"
    >
      {/* Search Dialog Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '600px',
          background: 'var(--bg2)',
          border: '1px solid var(--brd)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '75vh',
        }}
      >
        {/* Input area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid var(--brd)' }}>
          <Icon name="fa-search" style={{ fontSize: '1.25rem', color: 'var(--txt2)' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type to search calculators, guides, or categories..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              color: 'var(--fg)',
            }}
          />
          <kbd
            style={{
              background: 'var(--bg3)',
              border: '1px solid var(--brd)',
              borderRadius: '6px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              color: 'var(--txt2)',
              fontFamily: 'monospace',
              pointerEvents: 'none',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results area */}
        {results.length > 0 ? (
          <div
            ref={resultsRef}
            style={{
              padding: '8px',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {results.map((r, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={r.type + '-' + r.id}
                  onClick={() => {
                    router.push(r.url);
                    closeAndReset();
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: isActive ? 'var(--bg3)' : 'transparent',
                    border: '1px solid ' + (isActive ? 'var(--brd)' : 'transparent'),
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: isActive ? 'var(--p)' : 'var(--bg3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive ? '#fff' : 'var(--txt2)',
                      transition: 'all 0.15s ease',
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={r.icon} />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: isActive ? 'var(--p)' : 'var(--fg)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {r.name}
                    </div>
                    {r.desc && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--txt2)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginTop: '2px' }}>
                        {r.desc}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, color: 'var(--txt2)', padding: '2px 8px', borderRadius: '4px', background: 'var(--bg3)', flexShrink: 0 }}>
                    {r.type}
                  </div>
                </div>
              );
            })}
          </div>
        ) : query.trim().length >= 2 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--fg-muted)' }}>
            <Icon name="fa-magnifying-glass-chart" style={{ fontSize: '2.5rem', color: 'var(--bg3)', marginBottom: '12px' }} />
            <p style={{ margin: 0, fontSize: '0.95rem' }}>No results matching &ldquo;{query}&rdquo;</p>
          </div>
        ) : (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--fg-muted)' }}>
            <Icon name="fa-keyboard" style={{ fontSize: '2.5rem', color: 'var(--bg3)', marginBottom: '12px' }} />
            <p style={{ margin: '0 0 6px', fontSize: '0.95rem' }}>Search across calculators, blogs, and categories</p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--txt2)' }}>Type 2 or more characters to begin</p>
          </div>
        )}

        {/* Footer shortcuts helper */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--brd)',
            background: 'var(--bg3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: 'var(--txt2)',
          }}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <span><kbd style={{ background: 'var(--bg2)', padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--brd)' }}>↑↓</kbd> Navigate</span>
            <span><kbd style={{ background: 'var(--bg2)', padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--brd)' }}>Enter</kbd> Select</span>
          </div>
          <span>Ctrl + K to toggle</span>
        </div>
      </div>
    </div>
  );
}
