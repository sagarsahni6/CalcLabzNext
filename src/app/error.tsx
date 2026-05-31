'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error for observability — replace with Sentry in production
    console.error('[CalcLabz Error Boundary]', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="card" style={{ textAlign: 'center', maxWidth: '560px', margin: '40px auto' }}>
      <div style={{ padding: '48px 24px' }}>
        {/* Error Icon */}
        <div style={{
          width: '72px', height: '72px', borderRadius: 'var(--r-xl)',
          background: 'linear-gradient(135deg, #EF4444, #DC2626)',
          display: 'grid', placeItems: 'center',
          margin: '0 auto 24px', fontSize: '1.8rem', color: '#fff',
          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.25)',
        }}>
          <Icon name="fa-triangle-exclamation" />
        </div>

        <h1 style={{
          fontSize: '1.5rem', fontWeight: 700,
          color: 'var(--txt)', marginBottom: '12px',
        }}>
          Something Went Wrong
        </h1>

        <p style={{
          fontSize: '.95rem', color: 'var(--txt1)',
          maxWidth: '380px', margin: '0 auto 28px',
          lineHeight: 1.6,
        }}>
          We encountered an unexpected error while loading this page.
          This has been logged and our team will look into it.
        </p>

        {/* Error digest for support reference */}
        {error.digest && (
          <p style={{
            fontSize: '.75rem', color: 'var(--txt2)',
            fontFamily: 'var(--font-mono, monospace)',
            marginBottom: '24px',
          }}>
            Error ID: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            className="btn btn-p"
            style={{ width: 'auto', padding: '12px 28px' }}
          >
            <Icon name="fa-rotate-right" /> Try Again
          </button>
          <Link
            href="/"
            className="btn btn-s"
            style={{ width: 'auto', padding: '12px 28px' }}
          >
            <Icon name="fa-house" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
