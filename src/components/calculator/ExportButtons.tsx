'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

interface ExportButtonsProps {
  resultRef?: React.RefObject<HTMLDivElement | null>;
  calcName: string;
  calcId: string;
}

function showToast(message: string) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
    background: 'var(--bg3, #252532)', color: 'var(--txt, #f0f0f5)',
    padding: '12px 24px', borderRadius: '12px', fontSize: '0.88rem',
    fontWeight: '600', zIndex: '9999', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    border: '1px solid var(--brd, rgba(255,255,255,0.1))',
    animation: 'slideUp 0.3s ease-out',
  });
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function ExportButton({ iconName, label, onClick }: { iconName: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '8px 14px', borderRadius: '10px',
        background: 'var(--bg2)', border: '1px solid var(--brd)',
        color: 'var(--txt1)', fontSize: '0.8rem', fontWeight: 500,
        cursor: 'pointer', transition: 'all 0.2s var(--ease)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = 'var(--bg3)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--p)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = 'var(--bg2)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--brd)';
      }}
    >
      <Icon name={iconName} style={{ fontSize: '0.9rem' }} />
      <span>{label}</span>
    </button>
  );
}

/* ── Share Menu with multiple platforms ── */
interface ShareOption {
  label: string;
  icon: string;
  color: string;
  getUrl: (text: string, pageUrl: string) => string;
}

const SHARE_OPTIONS: ShareOption[] = [
  {
    label: 'WhatsApp',
    icon: 'fa-whatsapp',
    color: '#25D366',
    getUrl: (text, pageUrl) => `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${pageUrl}`)}`,
  },
  {
    label: 'Telegram',
    icon: 'fa-telegram',
    color: '#0088CC',
    getUrl: (text, pageUrl) => `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}`,
  },
  {
    label: 'X (Twitter)',
    icon: 'fa-x-twitter',
    color: '#1DA1F2',
    getUrl: (text, pageUrl) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`,
  },
  {
    label: 'LinkedIn',
    icon: 'fa-linkedin',
    color: '#0A66C2',
    getUrl: (text, pageUrl) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}&summary=${encodeURIComponent(text)}`,
  },
  {
    label: 'Email',
    icon: 'fa-envelope',
    color: '#6366F1',
    getUrl: (text, pageUrl) => `mailto:?subject=${encodeURIComponent('Calculator Results - CalcLabz')}&body=${encodeURIComponent(`${text}\n\n${pageUrl}`)}`,
  },
];

function ShareMenu({ resultRef, calcName, calcId }: ExportButtonsProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  function getShareText(): string {
    const el = resultRef?.current;
    if (!el) return `${calcName} Results (CalcLabz)`;
    const text = el.innerText;
    return `*${calcName} Results* (CalcLabz)\n\n${text}`;
  }

  function getPageUrl(): string {
    if (typeof window !== 'undefined') return window.location.href;
    return `https://calclabz.com/${calcId}-calculator`;
  }

  async function handleNativeShare() {
    const text = getShareText();
    const pageUrl = getPageUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: `${calcName} - CalcLabz`, text, url: pageUrl });
      } catch {
        // User cancelled
      }
    }
    setOpen(false);
  }

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <ExportButton iconName="fa-share-nodes" label="Share" onClick={() => setOpen(!open)} />

      {open && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--bg1, #12121a)',
            border: '1px solid var(--brd, rgba(255,255,255,0.1))',
            borderRadius: '14px',
            padding: '8px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(16px)',
            zIndex: 100,
            minWidth: '180px',
            animation: 'fadeIn 0.2s var(--ease)',
          }}
        >
          {/* Platform options */}
          {SHARE_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              onClick={() => {
                const text = getShareText();
                const pageUrl = getPageUrl();
                window.open(opt.getUrl(text, pageUrl), '_blank', 'noopener,noreferrer');
                setOpen(false);
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                width: '100%', padding: '10px 12px', borderRadius: '10px',
                background: 'transparent', border: 'none',
                color: 'var(--txt1)', fontSize: '0.82rem', fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.15s var(--ease)',
                textAlign: 'left',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <Icon name={opt.icon} style={{ fontSize: '1rem', color: opt.color, width: '20px', textAlign: 'center' }} />
              <span>{opt.label}</span>
            </button>
          ))}

          {/* Native Share API (mobile) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <>
              <div style={{
                height: '1px', background: 'var(--brd)', margin: '4px 8px',
              }} />
              <button
                onClick={handleNativeShare}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', padding: '10px 12px', borderRadius: '10px',
                  background: 'transparent', border: 'none',
                  color: 'var(--txt1)', fontSize: '0.82rem', fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.15s var(--ease)',
                  textAlign: 'left',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <Icon name="fa-up-right-from-square" style={{ fontSize: '1rem', color: 'var(--p)', width: '20px', textAlign: 'center' }} />
                <span>More Options…</span>
              </button>
            </>
          )}

          {/* Copy Link */}
          <div style={{
            height: '1px', background: 'var(--brd)', margin: '4px 8px',
          }} />
          <button
            onClick={() => {
              navigator.clipboard.writeText(getPageUrl()).then(() => {
                showToast('Link copied!');
                setOpen(false);
              });
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              width: '100%', padding: '10px 12px', borderRadius: '10px',
              background: 'transparent', border: 'none',
              color: 'var(--txt1)', fontSize: '0.82rem', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.15s var(--ease)',
              textAlign: 'left',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bg2)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            <Icon name="fa-link" style={{ fontSize: '1rem', color: 'var(--txt2)', width: '20px', textAlign: 'center' }} />
            <span>Copy Link</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExportButtons({ resultRef, calcName, calcId }: ExportButtonsProps) {
  return (
    <div style={{
      display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px',
    }}>
      <ExportButton iconName="fa-print" label="Print" onClick={() => window.print()} />
      <ExportButton iconName="fa-copy" label="Copy" onClick={() => {
        const el = resultRef?.current;
        if (!el) return;
        const text = el.innerText;
        navigator.clipboard.writeText(`${calcName} Results\n${'─'.repeat(30)}\n${text}`).then(() => {
          showToast('Results copied to clipboard!');
        }).catch(() => {
          showToast('Failed to copy');
        });
      }} />
      <ShareMenu resultRef={resultRef} calcName={calcName} calcId={calcId} />
    </div>
  );
}
