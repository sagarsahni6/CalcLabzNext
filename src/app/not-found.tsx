import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { CATEGORY_META, CalculatorCategory } from '@/types/calculator';

// SEO metadata for the 404 page — best practice even though Google won't index it
export const metadata: Metadata = {
  title: '404 — Page Not Found | Calc Labz',
  description: 'The calculator or page you are looking for does not exist. Browse our 300+ free online calculators by category.',
  robots: {
    index: false,
    follow: true,
  },
};

const topCategories = ['finance', 'health', 'math', 'everyday'] as CalculatorCategory[];

export default function NotFound() {
  return (
    <div className="card" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
      {/* Animated 404 Hero */}
      <div style={{
        padding: '48px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background orbs */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,76,143,.15), transparent 65%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,61,117,.1), transparent 65%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }} />

        {/* Icon */}
        <div style={{
          width: '80px', height: '80px', borderRadius: 'var(--r-xl)',
          background: 'var(--gradient-primary)',
          display: 'grid', placeItems: 'center',
          margin: '0 auto 24px', fontSize: '2rem', color: '#fff',
          boxShadow: '0 8px 32px var(--p-glow)',
        }}>
          <Icon name="fa-calculator" />
        </div>

        {/* Error Number */}
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          fontWeight: 900,
          background: 'var(--gradient-primary)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-.04em',
          lineHeight: 1,
          marginBottom: '12px',
          position: 'relative',
          zIndex: 1,
        }}>
          404
        </h1>

        <h2 style={{
          fontSize: '1.3rem', fontWeight: 700,
          color: 'var(--txt)', marginBottom: '12px',
          position: 'relative', zIndex: 1,
        }}>
          Page Not Found
        </h2>

        <p style={{
          fontSize: '.95rem', color: 'var(--txt1)',
          maxWidth: '400px', margin: '0 auto 28px',
          lineHeight: 1.6, position: 'relative', zIndex: 1,
        }}>
          The calculator or page you&apos;re looking for doesn&apos;t exist.
          Try searching below or explore our popular categories.
        </p>

        {/* Search CTA */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <Link href="/" className="btn btn-p" style={{ padding: '12px 28px' }}>
            <Icon name="fa-house" /> Go Home
          </Link>
        </div>
      </div>

      {/* Category Quick Links */}
      <div style={{
        borderTop: '1px solid var(--brd)',
        padding: '28px 24px',
        marginTop: '8px',
      }}>
        <h3 style={{
          fontSize: '.88rem', fontWeight: 700,
          color: 'var(--txt2)', textTransform: 'uppercase',
          letterSpacing: '.06em', marginBottom: '16px',
        }}>
          Browse Categories
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px',
        }}>
          {topCategories.map((key) => {
            const cat = CATEGORY_META[key];
            return (
              <Link
                key={key}
                href={`/${key}-calculators`}
                className="related-card"
                style={{ justifyContent: 'center', textAlign: 'center', padding: '14px 12px', flexDirection: 'column', gap: '8px' }}
              >
                <div className="related-card-icon" style={{ background: cat.color, margin: '0 auto' }}>
                  <Icon name={cat.icon} />
                </div>
                <span style={{ fontSize: '.82rem', fontWeight: 600 }}>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
