'use client';

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
        (e.target as HTMLElement).style.background = 'var(--bg3)';
        (e.target as HTMLElement).style.borderColor = 'var(--p)';
      }}
      onMouseLeave={e => {
        (e.target as HTMLElement).style.background = 'var(--bg2)';
        (e.target as HTMLElement).style.borderColor = 'var(--brd)';
      }}
    >
      <Icon name={iconName} style={{ fontSize: '0.9rem' }} />
      <span>{label}</span>
    </button>
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
      <ExportButton iconName="fa-download" label="CSV" onClick={() => {
        const el = resultRef?.current;
        if (!el) return;
        const rows: string[][] = [['Label', 'Value']];
        const cards = el.querySelectorAll('.res-card');
        cards.forEach(card => {
          const label = card.querySelector('.res-lbl')?.textContent || '';
          const value = card.querySelector('.res-val')?.textContent || '';
          if (label && value) rows.push([label, value]);
        });
        const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${calcId}-results.csv`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('CSV downloaded!');
      }} />
      <ExportButton iconName="fa-share" label="WhatsApp" onClick={() => {
        const el = resultRef?.current;
        if (!el) return;
        const text = el.innerText;
        const msg = encodeURIComponent(`*${calcName} Results* (CalcLabz)\n\n${text}\n\nhttps://calclabz.com/${calcId}-calculator`);
        window.open(`https://wa.me/?text=${msg}`, '_blank');
      }} />
    </div>
  );
}
