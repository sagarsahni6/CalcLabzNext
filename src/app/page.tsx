import Link from 'next/link';
import { DB, getCalcsByCategory, getSlugForId } from '@/data/calculator-db';
import { CATEGORY_META, CalculatorCategory } from '@/types/calculator';
import Icon from '@/components/ui/Icon';
import RecentlyUsed from '@/components/home/RecentlyUsed';
import AnimatedHeroText from '@/components/home/AnimatedHeroText';
import CountUpValue from '@/components/ui/CountUpValue';
import JsonLd from '@/components/seo/JsonLd';
import { getHomePageSchema } from '@/lib/seo/schema';

export default function HomePage() {
  const featured = ['emi', 'sip', 'gst', 'bmi', 'percentage', 'incometax', 'taxregime', 'cagr'];
  const categories = Object.keys(CATEGORY_META) as CalculatorCategory[];

  // SoftwareApplication schema for the home page.
  // WebSite + Organization schemas are now rendered globally in layout.tsx.
  // NOTE: aggregateRating removed — fabricated ratings violate Google spam policies
  // and risk a manual action. Only add real ratings from third-party platforms.
  const softwareAppSchema = getHomePageSchema();

  return (
    <>
      {/* ── JSON-LD Structured Data (raw script, NOT next/Script) ── */}
      <JsonLd id="home-software-app-schema" data={softwareAppSchema} />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Trusted tools for<br /><span className="hero-accent">real decisions</span></h1>
            <p>
              Access over 300+ precision calculators designed for professionals. From
              complex financial modeling to everyday unit conversions, we provide the
              clarity you need.
            </p>

            <div className="hero-quick-access">
              <span>Quick Access:</span>
              <Link href="/mortgage-calculator">Mortgage</Link>
              <Link href="/bmi-calculator">BMI Index</Link>
              <Link href="/tax-saving-calculator">Tax Savings</Link>
              <Link href="/scientific-calculator">Scientific</Link>
            </div>

            <div className="hero-ctas">
              <Link href="/finance-calculators" className="hero-cta-primary">
                Explore All Calculators
                <Icon name="fa-arrow-right" style={{ width: '14px', height: '14px' }} />
              </Link>
              <Link href="/blog" className="hero-cta-secondary">
                Read Guides
              </Link>
            </div>
          </div>

          {/* Advanced Dashboard Illustration */}
          <div className="hero-illustration" aria-hidden="true">
            <svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg">

              {/* ── Large decorative orbit ring ── */}
              <circle cx="240" cy="210" r="140" stroke="url(#orbitGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
              <circle cx="240" cy="210" r="100" stroke="url(#orbitGrad)" strokeWidth="1" fill="none" opacity="0.25" strokeDasharray="6 4" />

              {/* ── Orbit gradient fill (subtle) ── */}
              <circle cx="240" cy="210" r="140" fill="url(#orbitFill)" opacity="0.08" />

              {/* ── Floating Card 1: EMI Calculator (top-left) ── */}
              <g className="hero-float-badge" filter="url(#cardShadow)">
                <rect x="80" y="30" width="160" height="64" rx="14" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
                {/* Icon circle */}
                <circle cx="108" cy="54" r="14" fill="#DCFCE7" />
                <text x="108" y="59" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="700" fill="#059669">✓</text>
                {/* Text */}
                <text x="132" y="53" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="700" fill="#1E293B">EMI Calc</text>
                {/* Progress bar */}
                <rect x="132" y="62" width="90" height="5" rx="2.5" fill="#E2E8F0" />
                <rect x="132" y="62" width="65" height="5" rx="2.5" fill="#10B981" />
              </g>

              {/* ── Floating Card 2: SIP Returns (main dashboard card) ── */}
              <g className="hero-float-badge-2" filter="url(#cardShadow)">
                <rect x="200" y="150" width="195" height="130" rx="16" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
                {/* Header */}
                <text x="220" y="178" fontFamily="system-ui, sans-serif" fontSize="10.5" fontWeight="500" fill="#94A3B8" letterSpacing="0.5">SIP Returns</text>
                {/* Value */}
                <text x="220" y="204" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="800" fill="#1E293B">₹14,28,900</text>
                {/* Icon */}
                <rect x="362" y="160" width="22" height="22" rx="6" fill="#EFF6FF" />
                <text x="373" y="176" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fill="#2563EB">📊</text>
                {/* Mini bar chart */}
                <rect x="220" y="248" width="22" height="18" rx="3" fill="#BFDBFE" />
                <rect x="249" y="240" width="22" height="26" rx="3" fill="#93C5FD" />
                <rect x="278" y="232" width="22" height="34" rx="3" fill="#60A5FA" />
                <rect x="307" y="222" width="22" height="44" rx="3" fill="#3B82F6" />
                <rect x="336" y="236" width="22" height="30" rx="3" fill="#2563EB" />
              </g>

              {/* ── Floating Mini Card 3: Grid icon (top-right) ── */}
              <g className="hero-float-badge-3" filter="url(#cardShadow)">
                <rect x="340" y="60" width="48" height="48" rx="12" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
                {/* 2x2 grid dots */}
                <rect x="353" y="73" width="8" height="8" rx="2" fill="#DBEAFE" />
                <rect x="364" y="73" width="8" height="8" rx="2" fill="#93C5FD" />
                <rect x="353" y="84" width="8" height="8" rx="2" fill="#93C5FD" />
                <rect x="364" y="84" width="8" height="8" rx="2" fill="#2563EB" />
              </g>

              {/* ── Floating accent dot (middle-left) ── */}
              <g className="hero-float-dot">
                <circle cx="130" cy="200" r="18" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="1" />
                <text x="130" y="206" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="14" fill="#3B82F6">%</text>
              </g>

              {/* ── Small orbiting dot ── */}
              <circle cx="340" cy="320" r="5" fill="#3B82F6" opacity="0.5" />
              <circle cx="120" cy="310" r="3" fill="#93C5FD" opacity="0.4" />
              <circle cx="380" cy="150" r="4" fill="#A78BFA" opacity="0.35" />

              {/* ── Defs ── */}
              <defs>
                <linearGradient id="orbitGrad" x1="100" y1="70" x2="380" y2="350" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#93C5FD" />
                  <stop offset="1" stopColor="#DBEAFE" />
                </linearGradient>
                <radialGradient id="orbitFill" cx="240" cy="210" r="140" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                </radialGradient>
                <filter id="cardShadow" x="-8" y="-4" width="120%" height="130%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.08" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      <RecentlyUsed />

      {/* ── Popular Calculators ── */}
      <section className="featured-section">
        <div className="sec-hdr">
          <div className="sec-ttl">
            <Icon name="fa-fire" style={{ color: 'var(--rose)', marginRight: '6px' }} />
            Popular Calculators
          </div>
        </div>
        <div className="feat-grid">
          {featured.map((id) => {
            const calc = DB[id];
            if (!calc) return null;
            const catMeta = CATEGORY_META[calc.cat];
            const baseColor = catMeta.color.match(/#[0-9A-Fa-f]{6}/)?.[0] || '#2563EB';
            return (
              <Link
                key={id}
                href={`/${getSlugForId(id)}`}
                className="feat-card"
                style={{
                  '--card-accent': catMeta.color,
                  '--card-color': baseColor
                } as React.CSSProperties}
                aria-label={`Open ${calc.name}`}
              >
                <div className="fc-ico">
                  <Icon name={calc.icon} />
                </div>
                <div className="fc-name">{calc.name}</div>
                <div className="fc-desc">{calc.desc}</div>
                <div className="fc-usage">
                  <Icon name="fa-chart-line" style={{ fontSize: '.65rem' }} />
                  Popular
                </div>
                {calc.badge && <span className="badge">{calc.badge}</span>}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Browse by Category ── */}
      <section className="featured-section">
        <div className="sec-hdr">
          <div className="sec-ttl">
            <Icon name="fa-border-all" style={{ color: 'var(--p2)', marginRight: '6px' }} />
            Browse by Category
          </div>
        </div>
        <div className="feat-grid">
          {categories.map((catKey) => {
            const cat = CATEGORY_META[catKey];
            const count = getCalcsByCategory(catKey).length;
            const baseColor = cat.color.match(/#[0-9A-Fa-f]{6}/)?.[0] || '#2563EB';
            return (
              <Link
                key={catKey}
                href={`/${catKey}-calculators`}
                className="feat-card"
                style={{
                  '--card-accent': cat.color,
                  '--card-color': baseColor
                } as React.CSSProperties}
                aria-label={`${cat.name} calculators`}
              >
                <div className="fc-ico">
                  <Icon name={cat.icon} />
                </div>
                <div className="fc-name">{cat.name}</div>
                <div className="fc-desc">{count} calculators • {cat.description}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Why Calc Labz — Trust Feature Grid ── */}
      <section className="why-section">
        <div className="trust-feature-grid">
          <div className="trust-feature-card">
            <div className="trust-feature-icon">
              <Icon name="fa-file-lines" />
            </div>
            <h3>Documented Methodology</h3>
            <p>Every calculator includes the mathematical formulas and logic used, ensuring transparency and trust in your results.</p>
          </div>
          <div className="trust-feature-card">
            <div className="trust-feature-icon">
              <Icon name="fa-book-open" />
            </div>
            <h3>Guides that Add Context</h3>
            <p>Beyond raw numbers, we provide comprehensive guides explaining how to interpret and apply the calculations to real-world scenarios.</p>
          </div>
          <div className="trust-feature-card">
            <div className="trust-feature-icon">
              <Icon name="fa-shield-halved" />
            </div>
            <h3>Privacy-First Architecture</h3>
            <p>Your data is processed locally in your browser whenever possible. We don&apos;t store your sensitive financial or health inputs.</p>
          </div>
        </div>
      </section>

      {/* ── Calc Labz by the Numbers — Factual Trust Signals ── */}
      <section className="testimonials-section">
        <h2>Calc Labz by the Numbers</h2>
        <p className="testimonials-subtitle">
          Built for accuracy, designed for privacy, trusted by students &amp; professionals across India.
        </p>
        <div className="testimonials-grid">
          <div className="testimonial-card" style={{ textAlign: 'center' }}>
            <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, #2563EB, #3B82F6)', margin: '0 auto 12px', width: '56px', height: '56px', fontSize: '1.4rem' }}>
              <Icon name="fa-calculator" style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="testimonial-name" style={{ fontSize: '2rem', fontWeight: 800 }}>
              <CountUpValue value="268+" />
            </div>
            <div className="testimonial-role">Free Calculators</div>
            <p className="testimonial-text" style={{ fontSize: '0.85rem', marginTop: '8px' }}>
              Finance, health, math, engineering, science, education, and everyday tools — all free, forever.
            </p>
          </div>

          <div className="testimonial-card" style={{ textAlign: 'center' }}>
            <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, #059669, #10B981)', margin: '0 auto 12px', width: '56px', height: '56px', fontSize: '1.4rem' }}>
              <Icon name="fa-border-all" style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="testimonial-name" style={{ fontSize: '2rem', fontWeight: 800 }}>
              <CountUpValue value={10} />
            </div>
            <div className="testimonial-role">Categories</div>
            <p className="testimonial-text" style={{ fontSize: '0.85rem', marginTop: '8px' }}>
              Organized across 10 well-defined categories with dedicated hub pages and easy navigation.
            </p>
          </div>

          <div className="testimonial-card" style={{ textAlign: 'center' }}>
            <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)', margin: '0 auto 12px', width: '56px', height: '56px', fontSize: '1.4rem' }}>
              <Icon name="fa-book-open" style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="testimonial-name" style={{ fontSize: '2rem', fontWeight: 800 }}>
              <CountUpValue value="126+" />
            </div>
            <div className="testimonial-role">In-Depth Guides</div>
            <p className="testimonial-text" style={{ fontSize: '0.85rem', marginTop: '8px' }}>
              Detailed articles explaining formulas, use-cases, and practical examples for every major calculator.
            </p>
          </div>

          <div className="testimonial-card" style={{ textAlign: 'center' }}>
            <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, #DC2626, #EF4444)', margin: '0 auto 12px', width: '56px', height: '56px', fontSize: '1.4rem' }}>
              <Icon name="fa-shield-halved" style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="testimonial-name" style={{ fontSize: '2rem', fontWeight: 800 }}>
              100%
            </div>
            <div className="testimonial-role">Client-Side Privacy</div>
            <p className="testimonial-text" style={{ fontSize: '0.85rem', marginTop: '8px' }}>
              All calculations run in your browser. Zero data sent to servers. No signups. Works offline as a PWA.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
