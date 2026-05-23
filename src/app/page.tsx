import Link from 'next/link';
import Script from 'next/script';
import { DB, getCalcsByCategory, getSlugForId } from '@/data/calculator-db';
import { CATEGORY_META, CalculatorCategory } from '@/types/calculator';
import Icon from '@/components/ui/Icon';
import RecentlyUsed from '@/components/home/RecentlyUsed';
import HeroSearchTrigger from '@/components/home/HeroSearchTrigger';

export default function HomePage() {
  const featured = ['emi', 'sip', 'gst', 'bmi', 'percentage', 'incometax', 'taxregime', 'cagr'];
  const categories = Object.keys(CATEGORY_META) as CalculatorCategory[];

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calc Labz',
    url: 'https://calclabz.com',
    description: 'Free online calculators for EMI, SIP, GST, BMI, income tax and 300+ more. Instant results, no signup, works offline as a PWA.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://calclabz.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-IN',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calc Labz',
    url: 'https://calclabz.com',
    logo: 'https://calclabz.com/calclabz-logo.png',
    description: 'India\'s comprehensive free calculator platform with 300+ tools across finance, health, math, education, and engineering.',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Sagar Sahni',
      url: 'https://calclabz.com/author/sagar-sahni',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'sagarsahni69@gmail.com',
      contactType: 'customer support',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://github.com/sagarsahni6',
    ],
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calc Labz',
    url: 'https://calclabz.com',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web, Android, iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1200',
      bestRating: '5',
    },
  };

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="software-app-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Trusted by students, engineers &amp; professionals
        </div>
        <h1>300+ Free Online Calculators</h1>
        <p style={{ marginBottom: '28px' }}>
          EMI, SIP, GST, BMI, income tax and more — instant results, verified formulas, works offline.
        </p>
        <HeroSearchTrigger />
        <div className="hero-ctas">
          <Link href="/finance-calculators" className="hero-cta-primary">
            Explore All Calculators
          </Link>
          <Link href="/blog" className="hero-cta-secondary">
            Read Guides
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="stats-row">
        <div className="stat">
          <div className="stat-icon stat-blue">
            <Icon name="fa-flask" />
          </div>
          <div className="stat-n">300+</div>
          <div className="stat-l">Calculators</div>
        </div>
        <div className="stat">
          <div className="stat-icon stat-purple">
            <Icon name="fa-border-all" />
          </div>
          <div className="stat-n">10</div>
          <div className="stat-l">Categories</div>
        </div>
        <div className="stat">
          <div className="stat-icon stat-pink">
            <Icon name="fa-shield-halved" />
          </div>
          <div className="stat-n">100%</div>
          <div className="stat-l">Free Access</div>
        </div>
        <div className="stat">
          <div className="stat-icon stat-sky">
            <Icon name="fa-wifi" />
          </div>
          <div className="stat-n">PWA</div>
          <div className="stat-l">Works Offline</div>
        </div>
      </div>

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
            return (
              <Link
                key={id}
                href={`/${getSlugForId(id)}`}
                className="feat-card"
                style={{ '--card-accent': catMeta.color } as React.CSSProperties}
                aria-label={`Open ${calc.name}`}
              >
                <div className="fc-ico" style={{ background: catMeta.color }}>
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
            return (
              <Link
                key={catKey}
                href={`/${catKey}-calculators`}
                className="feat-card"
                style={{ '--card-accent': cat.color } as React.CSSProperties}
                aria-label={`${cat.name} calculators`}
              >
                <div className="fc-ico" style={{ background: cat.color }}>
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
        <h2>Why Calc Labz?</h2>
        <div className="trust-feature-grid">
          <div className="trust-feature-card">
            <div className="trust-feature-icon" style={{ background: 'var(--p)' }}>
              <Icon name="fa-check-circle" />
            </div>
            <h3>100% Free Forever</h3>
            <p>300+ calculators across finance, health, math, and engineering — no hidden costs, no paywalls.</p>
          </div>
          <div className="trust-feature-card">
            <div className="trust-feature-icon" style={{ background: 'var(--indigo)' }}>
              <Icon name="fa-lock" />
            </div>
            <h3>Privacy First</h3>
            <p>All calculations run in your browser. Zero data sent to servers. Your numbers stay on your device.</p>
          </div>
          <div className="trust-feature-card">
            <div className="trust-feature-icon" style={{ background: '#0EA5E9' }}>
              <Icon name="fa-wifi" />
            </div>
            <h3>Works Offline</h3>
            <p>Install as a Progressive Web App (PWA) for instant access anytime, even without internet.</p>
          </div>
        </div>
        <p>
          Popular tools include the <Link href="/emi-calculator">EMI Calculator</Link>,{' '}
          <Link href="/sip-calculator">SIP Calculator</Link>,{' '}
          <Link href="/gst-calculator">GST Calculator</Link>,{' '}
          <Link href="/bmi-calculator">BMI Calculator</Link>, and{' '}
          <Link href="/incometax-calculator">Income Tax Calculator</Link>.
        </p>
      </section>
    </>
  );
}
