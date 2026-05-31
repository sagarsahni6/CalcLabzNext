import type { Metadata } from 'next';
import Link from 'next/link';
import AboutContactCard from '@/components/ui/AboutContactCard';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'About Calc Labz — Our Mission, Team & Methodology',
  description: 'Learn about Calc Labz, the team behind 300+ free online calculators, our editorial standards, and how we ensure accuracy in every calculation.',
  alternates: {
    canonical: 'https://calclabz.com/about',
  },
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Calc Labz',
    description: 'Learn about Calc Labz, the team behind 300+ free online calculators, our editorial standards, and how we ensure accuracy.',
    url: 'https://calclabz.com/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'Calc Labz',
      url: 'https://calclabz.com',
      logo: 'https://calclabz.com/calclabz-logo.png',
      foundingDate: '2024',
      founder: {
        '@type': 'Person',
        name: 'Sagar Sahni',
        url: 'https://calclabz.com/author/sagar-sahni',
        jobTitle: 'Founder & Editor',
        email: 'support@calclabz.com',
        sameAs: ['https://github.com/sagarsahni6'],
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@calclabz.com',
        contactType: 'customer support',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Delhi',
        addressCountry: 'IN',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calclabz.com' },
      { '@type': 'ListItem', position: 2, name: 'About Calc Labz', item: 'https://calclabz.com/about' },
    ],
  };

  return (
    <div className="pulse">
      {/* JSON-LD — raw <script> tags for SSR HTML visibility to Googlebot */}
      <JsonLd id="about-schemas" data={[aboutSchema, breadcrumbSchema]} />
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>About Calc Labz</span>
      </nav>

      {/* ── Hero Story Section ── */}
      <div className="about-hero" style={{ marginTop: '12px' }}>
        <div className="about-hero-eyebrow">
          🇮🇳 Built in India, Used Worldwide
        </div>
        <h1>About Calc Labz</h1>
        <p className="about-hero-mission">
          We believe everyone deserves access to accurate, trustworthy calculation tools — without paywalls, signups, or data collection. From EMI to BMI, we make numbers make sense.
        </p>
      </div>

      <article className="card" style={{ padding: '32px' }}>
        {/* ── Our Mission ── */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--txt)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.3rem' }}>🎯</span> Our Mission
          </h2>
          <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            We started Calc Labz with a simple observation: most online calculators are either buried behind ads and popups, or they give results without showing the methodology. We wanted to build something different — a platform where every calculation is transparent, every formula is documented, and every result can be verified.
          </p>
          <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.95rem', marginTop: '10px' }}>
            Today, Calc Labz offers over 300 calculators spanning finance, health & fitness, mathematics, education, engineering, and everyday decision-making. Each tool is designed to give you clear, actionable results with full transparency into how the numbers are computed.
          </p>
        </section>

        {/* ── Our Journey — Timeline ── */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--txt)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.3rem' }}>🚀</span> Our Journey
          </h2>
          <div className="about-timeline">
            <div className="about-timeline-item">
              <div className="about-timeline-dot" />
              <div className="about-timeline-year">2024 — The Beginning</div>
              <div className="about-timeline-title">Calc Labz Founded</div>
              <div className="about-timeline-desc">
                Started with just 20 finance calculators and a vision to make calculation tools accessible, accurate, and private for everyone.
              </div>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-dot" />
              <div className="about-timeline-year">Early 2025 — Expansion</div>
              <div className="about-timeline-title">100+ Calculators Milestone</div>
              <div className="about-timeline-desc">
                Expanded to health, math, education, and engineering categories. Launched the blog with detailed guides and formula explanations.
              </div>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-dot" />
              <div className="about-timeline-year">Mid 2025 — Going Offline</div>
              <div className="about-timeline-title">PWA & Offline Support</div>
              <div className="about-timeline-desc">
                Built Progressive Web App support so users can calculate anytime, anywhere — even without internet connectivity.
              </div>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-dot" />
              <div className="about-timeline-year">2026 — Today</div>
              <div className="about-timeline-title">300+ Calculators & 126 Guides</div>
              <div className="about-timeline-desc">
                Reached 300+ calculators across 10 categories, with 126 in-depth articles. Dark mode, dashboard, and personalized features launched.
              </div>
            </div>
          </div>
        </section>

        {/* ── Values / Principles ── */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--txt)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.3rem' }}>💎</span> Our Values
          </h2>
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon" style={{ background: 'linear-gradient(135deg, #2563EB, #3B82F6)' }}>
                🔍
              </div>
              <h3>Transparency</h3>
              <p>Every calculator shows the formula, methodology, and sources used. No black boxes.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon" style={{ background: 'linear-gradient(135deg, #059669, #10B981)' }}>
                🔒
              </div>
              <h3>Privacy First</h3>
              <p>All calculations run in your browser. Zero data is sent to servers. No signups required.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon" style={{ background: 'linear-gradient(135deg, #DC2626, #EF4444)' }}>
                ✅
              </div>
              <h3>Accuracy</h3>
              <p>Formulas sourced from textbooks, government publications, and industry standards.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon" style={{ background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)' }}>
                ♿
              </div>
              <h3>Accessibility</h3>
              <p>Free forever. Works offline. Accessible on any device, in any location.</p>
            </div>
          </div>
        </section>

        {/* ── Who We Are ── */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--txt)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.3rem' }}>👥</span> Who We Are
          </h2>
          <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Calc Labz is maintained by <Link href="/author/sagar-sahni" style={{ color: 'var(--p)', fontWeight: 700, textDecoration: 'none' }}>Sagar Sahni</Link> and a small editorial team based in India. Our team includes contributors with backgrounds in:
          </p>
          <ul style={{ paddingLeft: '20px', margin: '12px 0', color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.95rem', display: 'grid', gap: '6px' }}>
            <li><strong>Software Engineering</strong> — Building reliable, accessible web applications</li>
            <li><strong>Personal Finance</strong> — Understanding Indian tax laws, investment instruments, and banking products</li>
            <li><strong>Data Analysis</strong> — Ensuring our formulas and methodologies are accurate and well-sourced</li>
          </ul>
          <p style={{ color: 'var(--txt2)', lineHeight: 1.7, fontSize: '0.88rem', marginTop: '12px', fontStyle: 'italic' }}>
            We are not a financial advisory firm, a medical practice, or a licensed professional services company. We build tools that help you understand numbers — always consult qualified professionals for decisions about your money, health, or legal matters.
          </p>
        </section>

        {/* ── How We Ensure Accuracy ── */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--txt)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.3rem' }}>🔬</span> How We Ensure Accuracy
          </h2>
          <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Every calculator on Calc Labz follows our <Link href="/editorial-policy" style={{ color: 'var(--p)', textDecoration: 'underline' }}>editorial policy</Link>. In short:
          </p>
          <ul style={{ paddingLeft: '20px', margin: '12px 0', color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.95rem', display: 'grid', gap: '6px' }}>
            <li>Formulas are sourced from established textbooks, government publications, or industry-standard references</li>
            <li>Financial calculators reference current tax slabs from the Income Tax Department of India, RBI circulars, and SEBI guidelines</li>
            <li>Health calculators use clinically validated formulas (e.g., Mifflin-St Jeor for BMR, Devine for ideal weight)</li>
            <li>All calculators include a methodology note explaining the formula used</li>
            <li>We display &quot;last updated&quot; dates so you know when formulas were last verified</li>
          </ul>
        </section>

        {/* ── Contact Us ── */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--txt)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.3rem' }}>📬</span> Contact Us
          </h2>
          <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '16px' }}>
            Have a question, spot an error, or want to suggest a new calculator? We typically respond within 24 hours.
          </p>
          <AboutContactCard />
        </section>

        <footer style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid var(--brd)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--txt2)', margin: 0 }}>
            <strong>Last updated:</strong> May 2026
          </p>
        </footer>
      </article>
    </div>
  );
}
