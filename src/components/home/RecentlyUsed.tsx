'use client';

import { useSyncExternalStore } from 'react';
import { getHistory, subscribe, formatTimeAgo } from '@/lib/history';
import { getSlugForId } from '@/data/calculator-db';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

const EMPTY_ARRAY: any[] = [];
const getServerSnapshot = () => EMPTY_ARRAY;

export default function RecentlyUsed() {
  const history = useSyncExternalStore(
    subscribe,
    getHistory,
    getServerSnapshot
  );

  // SSR-safe mount detection without setState in effect
  const mounted = useSyncExternalStore(
    (cb) => { cb(); return () => {}; },
    () => true,
    () => false,
  );

  const limitHistory = history.slice(0, 8);

  if (!mounted || limitHistory.length === 0) return null;

  return (
    <section style={{
      marginTop: '40px',
      animation: 'slideUp 0.4s var(--ease)',
    }}>
      <h2 style={{
        fontSize: '1.2rem', fontWeight: 700, color: 'var(--txt)',
        marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <Icon name="fa-clock" style={{ fontSize: '1.3rem', color: 'var(--p)' }} />
        Recently Used
      </h2>

      <div style={{
        display: 'flex', gap: '12px', overflowX: 'auto',
        paddingBottom: '8px', scrollSnapType: 'x mandatory',
      }}>
        {limitHistory.map((h, i) => (
          <Link
            href={`/${getSlugForId(h.calcId)}`}
            key={h.calcId}
            style={{
              flex: '0 0 auto',
              width: '200px',
              padding: '16px',
              background: 'var(--bg2)',
              borderRadius: '14px',
              border: '1px solid var(--brd)',
              textDecoration: 'none',
              scrollSnapAlign: 'start',
              transition: 'all 0.2s var(--ease)',
              animation: `slideUp 0.3s ease-out ${i * 60}ms both`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--p)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--brd)';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
            }}
          >
            <div style={{
              fontSize: '0.82rem', fontWeight: 600, color: 'var(--txt)',
              marginBottom: '8px', lineHeight: 1.3,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {h.name}
            </div>
            <div style={{
              fontSize: '1.1rem', fontWeight: 800, color: 'var(--p2)',
              marginBottom: '6px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {h.result}
            </div>
            <div style={{
              fontSize: '0.7rem', color: 'var(--txt2)',
            }}>
              {formatTimeAgo(h.ts)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
