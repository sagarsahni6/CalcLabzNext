'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

interface CalcLabzWindow {
  showToast?: (msg: string) => void;
}

function getWin(): CalcLabzWindow {
  return window as unknown as CalcLabzWindow;
}

interface FavoriteToggleProps {
  slug: string;
  name: string;
}

export default function FavoriteToggle({ slug, name }: FavoriteToggleProps) {
  // Always start as false on both server and client to avoid hydration mismatch
  const [isFav, setIsFav] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Read localStorage only after mount (client-only)
  useEffect(() => {
    try {
      const favs = localStorage.getItem('cp_favorites');
      if (favs) {
        const list = JSON.parse(favs) as string[];
        setIsFav(list.includes(slug));
      }
    } catch {
      // no-op
    }
    setLoaded(true);
  }, [slug]);

  const toggleFav = () => {
    try {
      const favs = localStorage.getItem('cp_favorites');
      let list: string[] = [];
      if (favs) {
        list = JSON.parse(favs) as string[];
      }

      if (list.includes(slug)) {
        list = list.filter((s) => s !== slug);
        setIsFav(false);
        const w = getWin();
        if (w.showToast) {
          w.showToast(`Removed "${name}" from favorites`);
        }
      } else {
        list.push(slug);
        setIsFav(true);
        const w = getWin();
        if (w.showToast) {
          w.showToast(`Added "${name}" to favorites`);
        }
      }

      localStorage.setItem('cp_favorites', JSON.stringify(list));
      // Dispatch storage event to notify other components (e.g. mobile nav, dashboard)
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.warn('Failed to update favorites:', e);
    }
  };

  if (!loaded) {
    return (
      <button className="fav-btn-placeholder" aria-label="Loading favorite status" style={{ width: '40px', height: '40px', background: 'var(--bg3)', borderRadius: '50%', border: 'none', cursor: 'wait' }} />
    );
  }

  return (
    <button
      onClick={toggleFav}
      className={`fav-btn ${isFav ? 'active' : ''}`}
      aria-label={isFav ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
      style={{
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isFav ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg3)',
        border: '1px solid ' + (isFav ? 'rgba(239, 68, 68, 0.3)' : 'var(--brd)'),
        color: isFav ? 'var(--rose)' : 'var(--txt2)',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        fontSize: '1.2rem',
        flexShrink: 0
      }}
    >
      {isFav ? (
        <Icon name="fa-heart" style={{ color: 'var(--rose)' }} />
      ) : (
        <Icon name="fa-heart" style={{ color: 'inherit', opacity: 0.45 }} />
      )}
    </button>
  );
}
