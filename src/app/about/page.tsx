import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

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
        email: 'sagarsahni69@gmail.com',
        sameAs: ['https://github.com/sagarsahni6'],
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'sagarsahni69@gmail.com',
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
      {/* JSON-LD Structured Data */}
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <Script
        id="about-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>About Calc Labz</span>
      </nav>

      <article className="card" style={{ marginTop: '12px' }}>
        <header className="calc-hdr" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, var(--p2), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 12px' }}>
            About Calc Labz
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--txt1)', lineHeight: 1.75 }}>
            Calc Labz is a free, open-access calculator platform built by a small team of engineers and finance professionals in India. We believe everyone deserves access to accurate, trustworthy calculation tools — without paywalls, signups, or data collection.
          </p>
        </header>

        <section style={{ marginBottom: '32px', display: 'grid', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--txt)' }}>Our Mission</h2>
            <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.92rem' }}>
              We started Calc Labz with a simple observation: most online calculators are either buried behind ads and popups, or they give results without showing the methodology. We wanted to build something different — a platform where every calculation is transparent, every formula is documented, and every result can be verified.
            </p>
            <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.92rem', marginTop: '10px' }}>
              Today, Calc Labz offers over 300 calculators spanning finance, health & fitness, mathematics, education, engineering, and everyday decision-making. Each tool is designed to give you clear, actionable results with full transparency into how the numbers are computed.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>Who We Are</h2>
            <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.92rem' }}>
              Calc Labz is maintained by <Link href="/author/sagar-sahni" style={{ color: 'var(--p2)', fontWeight: 700, textDecoration: 'none' }}>Sagar Sahni</Link> and a small editorial team based in India. Our team includes contributors with backgrounds in:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.92rem', display: 'grid', gap: '6px' }}>
              <li><strong>Software Engineering</strong> — Building reliable, accessible web applications</li>
              <li><strong>Personal Finance</strong> — Understanding Indian tax laws, investment instruments, and banking products</li>
              <li><strong>Data Analysis</strong> — Ensuring our formulas and methodologies are accurate and well-sourced</li>
            </ul>
            <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.92rem', marginTop: '10px' }}>
              We are not a financial advisory firm, a medical practice, or a licensed professional services company. We build tools that help you understand numbers — always consult qualified professionals for decisions about your money, health, or legal matters.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>How We Ensure Accuracy</h2>
            <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.92rem' }}>
              Every calculator on Calc Labz follows our <Link href="/editorial-policy" style={{ color: 'var(--p2)', textDecoration: 'underline' }}>editorial policy</Link>. In short:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.92rem', display: 'grid', gap: '6px' }}>
              <li>Formulas are sourced from established textbooks, government publications, or industry-standard references</li>
              <li>Financial calculators reference current tax slabs from the Income Tax Department of India, RBI circulars, and SEBI guidelines where applicable</li>
              <li>Health calculators use clinically validated formulas (e.g., Mifflin-St Jeor for BMR, Devine formula for ideal weight)</li>
              <li>All calculators include a methodology note explaining the formula used</li>
              <li>We display &quot;last updated&quot; dates so you know when formulas were last verified</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>Privacy &amp; Data</h2>
            <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.92rem' }}>
              Calc Labz does not collect personal data. All calculations happen in your browser — no data is sent to any server. We do not require signups, accounts, or email addresses to use any calculator. Read our full <Link href="/privacy" style={{ color: 'var(--p2)', textDecoration: 'underline' }}>Privacy Policy</Link> for details.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>Contact Us</h2>
            <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.92rem' }}>
              Have a question, spot an error, or want to suggest a new calculator? We would love to hear from you.
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.92rem', display: 'grid', gap: '6px' }}>
              <li><strong>Email:</strong> <a href="mailto:sagarsahni69@gmail.com" style={{ color: 'var(--p2)' }}>sagarsahni69@gmail.com</a></li>
              <li><strong>Contact Page:</strong> <Link href="/contact" style={{ color: 'var(--p2)' }}>calclabz.com/contact</Link></li>
            </ul>
          </div>
        </section>

        <footer style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--brd)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--txt2)', margin: 0 }}>
            <strong>Last updated:</strong> April 2026
          </p>
        </footer>
      </article>
    </div>
  );
}
