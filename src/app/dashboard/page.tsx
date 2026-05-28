'use client';

import { useEffect, useState, useMemo } from 'react';
import { DB, findCalcBySlug, getSlugForId } from '@/data/calculator-db';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { subscribe as subscribeHistory, clearHistory } from '@/lib/history';
import { CATEGORY_META, CalculatorCategory } from '@/types/calculator';

interface HistoryItem {
  calcId: string;
  name: string;
  result: string;
  ts: number;
  inputs?: Record<string, number | string>;
  category?: string;
}

interface FavoriteItem {
  slug: string;
  name: string;
  icon: string;
  catName: string;
}

export default function DashboardPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [greeting, setGreeting] = useState('Welcome back');

  // Compute category distribution analytics
  const categoryInsights = useMemo(() => {
    if (history.length === 0) return null;
    const counts: Record<string, number> = {};
    history.forEach((h) => {
      const calcDef = DB[h.calcId];
      const cat = calcDef?.cat || (h.category as CalculatorCategory) || 'other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const topCategoryKey = sorted[0]?.[0] as CalculatorCategory || 'other';
    const totalCount = history.length;
    return {
      topCategoryKey,
      distribution: sorted.map(([key, count]) => ({
        key: key as CalculatorCategory,
        count,
        percentage: Math.round((count / totalCount) * 100),
      })),
    };
  }, [history]);

  // Format calculation input parameters for dashboard list
  const formatInputs = (calcId: string, inputs?: Record<string, number | string>): string => {
    if (!inputs) return '';
    const calcDef = DB[calcId];
    if (!calcDef || !calcDef.inputs) return '';
    
    const parts: string[] = [];
    calcDef.inputs.forEach((inp) => {
      const val = inputs[inp.id];
      if (val !== undefined && val !== '') {
        let formattedVal = '';
        if (typeof val === 'number') {
          formattedVal = val.toLocaleString('en-IN');
        } else {
          const parsed = parseFloat(String(val));
          formattedVal = !isNaN(parsed) ? parsed.toLocaleString('en-IN') : String(val);
        }
        parts.push(`${inp.label}: ${inp.prefix || ''}${formattedVal}${inp.suffix || ''}`);
      }
    });
    
    return parts.join(' | ');
  };

  const loadData = () => {
    try {
      // Load History
      const histData = localStorage.getItem('cp_history');
      if (histData) {
        setHistory(JSON.parse(histData));
      } else {
        setHistory([]);
      }

      // Load Favorites
      const favSlugs = localStorage.getItem('cp_favorites');
      if (favSlugs) {
        const list = JSON.parse(favSlugs) as string[];
        const resolvedFavs: FavoriteItem[] = [];

        // Match slug back to DB calculators using findCalcBySlug
        list.forEach((slug) => {
          const calcId = findCalcBySlug(slug);
          const calcDef = calcId ? DB[calcId] : null;

          if (calcDef && calcId) {
            resolvedFavs.push({
              slug: getSlugForId(calcId),
              name: calcDef.name,
              icon: calcDef.icon,
              catName: calcDef.cat.charAt(0).toUpperCase() + calcDef.cat.slice(1),
            });
          } else {
            // Fallback for custom redirect slugs
            resolvedFavs.push({
              slug,
              name: slug.replace(/-calculator$/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
              icon: 'fa-calculator',
              catName: 'Tool',
            });
          }
        });
        setFavorites(resolvedFavs);
      } else {
        setFavorites([]);
      }
    } catch (e) {
      console.warn('Failed to load dashboard data:', e);
    }
    setLoaded(true);
  };

  useEffect(() => {
    loadData();

    // Determine greeting
    const hr = new Date().getHours();
    if (hr < 12) setGreeting('Good morning');
    else if (hr < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Listen for storage events (e.g. from bookmark toggle in other tabs)
    window.addEventListener('storage', loadData);
    // Listen for same-tab history mutations
    const unsubscribeHistory = subscribeHistory(loadData);

    return () => {
      window.removeEventListener('storage', loadData);
      unsubscribeHistory();
    };
  }, []);

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      try {
        clearHistory();
        const w = window as unknown as { showToast?: (msg: string) => void };
        if (w.showToast) {
          w.showToast('Calculation history cleared');
        }
      } catch (e) {
        console.warn('Failed to clear history:', e);
      }
    }
  };

  const handleRemoveFavorite = (slug: string, name: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the link
    e.stopPropagation();
    try {
      const favs = localStorage.getItem('cp_favorites');
      if (favs) {
        let list = JSON.parse(favs) as string[];
        list = list.filter((s) => s !== slug);
        localStorage.setItem('cp_favorites', JSON.stringify(list));
        loadData();
        const w = window as unknown as { showToast?: (msg: string) => void };
        if (w.showToast) {
          w.showToast(`Removed "${name}" from favorites`);
        }
      }
    } catch (err) {
      console.warn('Failed to remove favorite:', err);
    }
  };

  return (
    <div className="card animate-fade-in">
      {/* Breadcrumb */}
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <span>Dashboard</span>
      </nav>

      {/* Dashboard Header */}
      <div className="calc-hdr" style={{ marginBottom: '24px' }}>
        <div className="calc-title-row">
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'var(--fg)' }}>{greeting}, User!</h1>
            <p style={{ color: 'var(--fg-muted)', margin: '4px 0 0', fontSize: '1.1rem' }}>
              Your personalized workspace: calculations history, saved favorites, and utility analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Row */}
      {loaded && (history.length > 0 || favorites.length > 0) && (
        <div className="quick-actions-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '30px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--txt2)' }}>Quick Actions:</span>
          {(() => {
            const lastUsed = history[0];
            const lastUsedSlug = lastUsed ? getSlugForId(lastUsed.calcId) : null;
            if (!lastUsedSlug) return null;
            return (
              <Link href={`/${lastUsedSlug}`} className="btn btn-p" style={{ width: 'auto', display: 'inline-flex', padding: '8px 16px', fontSize: '0.85rem', borderRadius: '8px' }}>
                <Icon name="fa-rotate-right" style={{ marginRight: '6px' }} /> Continue with {lastUsed.name}
              </Link>
            );
          })()}
          <Link href="/" className="btn btn-s" style={{ width: 'auto', display: 'inline-flex', padding: '8px 16px', fontSize: '0.85rem', borderRadius: '8px' }}>
            <Icon name="fa-magnifying-glass" style={{ marginRight: '6px' }} /> Browse All Tools
          </Link>
        </div>
      )}

      {/* Stats Row */}
      <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '30px' }}>
        <div className="stat" style={{ background: 'var(--bg2)', padding: '20px', borderRadius: '16px', border: '1px solid var(--brd)', textAlign: 'center' }}>
          <div className="stat-n" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--p)' }}>{Object.keys(DB).length}</div>
          <div className="stat-l" style={{ fontSize: '0.85rem', color: 'var(--txt2)', marginTop: '4px' }}>Total Calculators</div>
        </div>
        <div className="stat" style={{ background: 'var(--bg2)', padding: '20px', borderRadius: '16px', border: '1px solid var(--brd)', textAlign: 'center' }}>
          <div className="stat-n" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--p)' }}>{loaded ? history.length : '0'}</div>
          <div className="stat-l" style={{ fontSize: '0.85rem', color: 'var(--txt2)', marginTop: '4px' }}>Recent Calculations</div>
        </div>
        <div className="stat" style={{ background: 'var(--bg2)', padding: '20px', borderRadius: '16px', border: '1px solid var(--brd)', textAlign: 'center' }}>
          <div className="stat-n" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--rose)' }}>{loaded ? favorites.length : '0'}</div>
          <div className="stat-l" style={{ fontSize: '0.85rem', color: 'var(--txt2)', marginTop: '4px' }}>Favorites Saved</div>
        </div>
        <div className="stat" style={{ background: 'var(--bg2)', padding: '20px', borderRadius: '16px', border: '1px solid var(--brd)', textAlign: 'center' }}>
          <div className="stat-n" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--emerald)' }}>100%</div>
          <div className="stat-l" style={{ fontSize: '0.85rem', color: 'var(--txt2)', marginTop: '4px' }}>Data Privacy</div>
        </div>
      </div>

      {/* Grid Layout for History and Favorites */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '30px' }}>
        
        {/* Favorites Card */}
        <div id="favorites" className="dash-card" style={{ background: 'var(--bg2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--brd)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', color: 'var(--fg)' }}>
            <Icon name="fa-heart" style={{ color: 'var(--rose)', marginRight: '6px' }} />
            Bookmarked Favorites
          </h3>

          {!loaded ? (
            <p style={{ color: 'var(--fg-muted)', fontSize: '0.95rem' }}>Loading favorites...</p>
          ) : favorites.length === 0 ? (
            <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--fg-muted)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="fa-heart" style={{ fontSize: '2.5rem', color: 'var(--bg3)', marginBottom: '12px' }} />
              <p style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>No calculators bookmarked yet.</p>
              <p style={{ margin: '0 0 20px', fontSize: '0.85rem', color: 'var(--txt2)', maxWidth: '250px' }}>
                Tap the heart icon next to any calculator&apos;s title to add it here.
              </p>
              
              {/* Trending Tools Shortcuts */}
              <div style={{ width: '100%', borderTop: '1px solid var(--brd)', paddingTop: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--txt2)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                  Trending Tools
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {[
                    { id: 'emi', name: 'EMI', icon: 'fa-building-columns', cat: 'finance' },
                    { id: 'sip', name: 'SIP', icon: 'fa-seedling', cat: 'finance' },
                    { id: 'gst', name: 'GST', icon: 'fa-file-invoice', cat: 'finance' },
                    { id: 'bmi', name: 'BMI', icon: 'fa-weight-scale', cat: 'health' },
                  ].map(item => (
                    <Link
                      key={item.id}
                      href={`/${getSlugForId(item.id)}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: 'var(--bg1)',
                        border: '1px solid var(--brd)',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        color: 'var(--txt1)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      className="related-pill"
                    >
                      <Icon name={item.icon} style={{ fontSize: '0.75rem', color: 'var(--p)' }} />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '350px', overflowY: 'auto', paddingRight: '4px', flex: 1 }}>
              {favorites.map((fav, index) => (
                <Link
                  key={index}
                  href={`/${fav.slug}`}
                  style={{
                    padding: '14px',
                    background: 'var(--bg1)',
                    border: '1px solid var(--brd)',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  className="related-pill"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p)' }}>
                      <Icon name={fav.icon} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--fg)' }}>{fav.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--txt2)', marginTop: '2px' }}>{fav.catName}</div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleRemoveFavorite(fav.slug, fav.name, e)}
                    aria-label={`Remove ${fav.name} from favorites`}
                    title="Remove Favorite"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--txt2)',
                      cursor: 'pointer',
                      padding: '4px',
                      borderRadius: '50%',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--rose)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--txt2)')}
                  >
                    <Icon name="fa-trash-can" />
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* History Card */}
        <div className="dash-card" style={{ background: 'var(--bg2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--brd)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', color: 'var(--fg)' }}>
            <Icon name="fa-clock-rotate-left" style={{ color: 'var(--p)', marginRight: '6px' }} />
            Recent Calculations
          </h3>

          {!loaded ? (
            <p style={{ color: 'var(--fg-muted)', fontSize: '0.95rem' }}>Loading calculation history...</p>
          ) : history.length === 0 ? (
            <div style={{ padding: '36px 0', textAlign: 'center', color: 'var(--fg-muted)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="fa-calculator" style={{ fontSize: '2.5rem', color: 'var(--bg3)', marginBottom: '12px' }} />
              <p style={{ margin: '0 0 16px', fontSize: '0.95rem' }}>No recent calculations found.</p>
              <Link href="/" className="btn btn-p" style={{ display: 'inline-flex', padding: '10px 20px', fontSize: '0.9rem' }}>
                Explore Calculators
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '350px', overflowY: 'auto', paddingRight: '4px', marginBottom: '16px', flex: 1 }}>
              {history.map((h, index) => {
                const inputSummary = formatInputs(h.calcId, h.inputs);
                return (
                  <div key={index} style={{ padding: '14px', background: 'var(--bg1)', border: '1px solid var(--brd)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.name}</div>
                      {inputSummary && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--txt2)', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={inputSummary}>
                          {inputSummary}
                        </div>
                      )}
                      <div style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', marginTop: '4px' }}>
                        {new Date(h.ts).toLocaleString()}
                      </div>
                    </div>
                    {h.result && (
                      <div style={{ fontWeight: 700, color: 'var(--p)', fontSize: '1.05rem', whiteSpace: 'nowrap' }}>
                        {h.result}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {loaded && (
            <button
              className="btn btn-s"
              data-action="clearHistory"
              onClick={handleClearHistory}
              disabled={history.length === 0}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: history.length === 0 ? 'var(--fg-muted)' : 'var(--acc)',
                border: '1px solid currentColor',
                background: 'transparent',
                alignSelf: 'flex-start',
                opacity: history.length === 0 ? 0.4 : 1,
                cursor: history.length === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <Icon name="fa-eraser" style={{ marginRight: '6px' }} /> Clear History
            </button>
          )}
        </div>

        {/* Category Insights Card */}
        {loaded && history.length > 0 && categoryInsights && (
          <div className="dash-card animate-fade-in" style={{ background: 'var(--bg2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--brd)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', color: 'var(--fg)' }}>
              <Icon name="fa-chart-pie" style={{ color: 'var(--p)', marginRight: '6px' }} />
              Category Insights
            </h3>
            
            {/* Top Category Highlight */}
            {(() => {
              const catKey = categoryInsights.topCategoryKey;
              const meta = CATEGORY_META[catKey];
              if (!meta) return null;
              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg1)', padding: '16px', borderRadius: '12px', border: '1px solid var(--brd)', marginBottom: '20px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: meta.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '20px', flexShrink: 0
                  }}>
                    <Icon name={meta.icon} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--txt2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Most Active Category
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--fg)', marginTop: '2px' }}>
                      {meta.name}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Category List Progress Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              {categoryInsights.distribution.map((item) => {
                const meta = CATEGORY_META[item.key];
                if (!meta) return null;
                return (
                  <div key={item.key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 600, color: 'var(--txt1)', marginBottom: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: meta.color.match(/#[0-9a-fA-F]{6}/)?.[0] || 'var(--p)' }}>●</span>
                        {meta.name}
                      </span>
                      <span>{item.percentage}% ({item.count})</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--bg3)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${item.percentage}%`,
                        height: '100%',
                        background: meta.color,
                        borderRadius: '4px',
                        transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Pro Tip */}
      <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(129, 140, 248, 0.05))', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '18px', borderRadius: '16px' }}>
        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--fg-muted)', lineHeight: 1.6 }}>
          <Icon name="fa-lightbulb" style={{ color: 'var(--p)', fontSize: '0.95rem' }} /> <strong>Privacy Note:</strong> All calculation records and favorited bookmarks are kept entirely locally inside your browser&apos;s secure <code>localStorage</code> database. No data is ever uploaded to our servers, keeping your workspace 100% private.
        </p>
      </div>
    </div>
  );
}
