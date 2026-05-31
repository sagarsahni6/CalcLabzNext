'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Root-level error boundary — catches errors in the root layout itself.
 * This component CANNOT use the app's layout, fonts, or CSS variables
 * because those may be the source of the error. Uses inline styles only.
 */
export default function RootError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('[CalcLabz Global Error]', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <html lang="en">
      <body style={{
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8FAFC',
        color: '#0F172A',
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '480px',
          padding: '48px 24px',
        }}>
          {/* Error Icon */}
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #EF4444, #DC2626)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', fontSize: '28px', color: '#fff',
          }}>
            ⚠
          </div>

          <h1 style={{
            fontSize: '1.5rem', fontWeight: 700,
            marginBottom: '12px', letterSpacing: '-0.02em',
          }}>
            Critical Error
          </h1>

          <p style={{
            fontSize: '0.95rem', color: '#64748B',
            lineHeight: 1.6, marginBottom: '32px',
          }}>
            Something went wrong at the application level.
            Please try refreshing the page.
          </p>

          {error.digest && (
            <p style={{
              fontSize: '0.75rem', color: '#94A3B8',
              fontFamily: 'monospace', marginBottom: '24px',
            }}>
              Reference: {error.digest}
            </p>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={reset}
              style={{
                padding: '12px 28px',
                background: '#2563EB', color: '#fff',
                border: 'none', borderRadius: '10px',
                fontWeight: 600, fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              ↻ Refresh Page
            </button>
            <a
              href="/"
              style={{
                padding: '12px 28px',
                background: '#F1F5F9', color: '#334155',
                border: '1px solid #E2E8F0', borderRadius: '10px',
                fontWeight: 600, fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center',
              }}
            >
              ⌂ Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
