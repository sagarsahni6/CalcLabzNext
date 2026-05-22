'use client';

import { useEffect, useState } from 'react';
import { DB, findCalcBySlug, getSlugForId } from '@/data/calculator-db';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { subscribe as subscribeHistory, clearHistory } from '@/lib/history';

interface HistoryItem {
  calcId: string;
  name: string;
  result: string;
  ts: number;
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
            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'var(--fg)' }}>Dashboard</h1>
            <p style={{ color: 'var(--fg-muted)', margin: '4px 0 0', fontSize: '1.1rem' }}>
              Your personalized workspace: calculations history, saved favorites, and utility analytics.
            </p>
          </div>
        </div>
      </div>

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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '30px' }}>
        
        {/* Favorites Card */}
        <div id="favorites" className="dash-card" style={{ background: 'var(--bg2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--brd)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', color: 'var(--fg)' }}>
            <Icon name="fa-heart" style={{ color: 'var(--rose)', marginRight: '6px' }} />
            Bookmarked Favorites
          </h3>

          {!loaded ? (
            <p style={{ color: 'var(--fg-muted)', fontSize: '0.95rem' }}>Loading favorites...</p>
          ) : favorites.length === 0 ? (
            <div style={{ padding: '36px 0', textAlign: 'center', color: 'var(--fg-muted)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="fa-heart" style={{ fontSize: '2.5rem', color: 'var(--bg3)', marginBottom: '12px' }} />
              <p style={{ margin: '0 0 16px', fontSize: '0.95rem' }}>No calculators bookmarked yet.</p>
              <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--txt2)', maxWidth: '250px' }}>
                Tap the heart icon next to any calculator&apos;s title to add it here.
              </p>
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
              {history.map((h, index) => (
                <div key={index} style={{ padding: '14px', background: 'var(--bg1)', border: '1px solid var(--brd)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--fg)' }}>{h.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', marginTop: '4px' }}>
                      {new Date(h.ts).toLocaleString()}
                    </div>
                  </div>
                  {h.result && (
                    <div style={{ fontWeight: 700, color: 'var(--p)', fontSize: '1.1rem' }}>
                      {h.result}
                    </div>
                  )}
                </div>
              ))}
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
