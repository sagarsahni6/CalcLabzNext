import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Editorial & Accuracy Policy — Calc Labz',
  description: 'Read about the Editorial Policy of Calc Labz. Learn how we research, source, test, and maintain the mathematical formulas and rates behind our calculators.',
  alternates: {
    canonical: 'https://calclabz.com/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calclabz.com' },
      { '@type': 'ListItem', position: 2, name: 'Editorial Policy', item: 'https://calclabz.com/editorial-policy' },
    ],
  };

  return (
    <div className="pulse">
      <JsonLd id="editorial-breadcrumb" data={breadcrumbSchema} />
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>Editorial Policy</span>
      </nav>

      <article className="card" style={{ marginTop: '12px' }}>
        <header className="calc-hdr" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, var(--p2), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 12px' }}>
            Editorial &amp; Accuracy Policy
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--txt1)', lineHeight: 1.75 }}>
            At Calc Labz, our reputation is built entirely on the trust and accuracy of our calculation tools. This Editorial Policy explains our research, validation, and maintenance standards for every tool we publish.
          </p>
        </header>

        <section style={{ display: 'grid', gap: '24px', fontSize: '0.92rem', color: 'var(--txt1)', lineHeight: 1.7 }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--txt)' }}>1. Sourcing and Research Standards</h2>
            <p>
              We do not invent or guess mathematical formulas. Every calculator on our platform uses formulas and variables sourced from highly reputable, verified institutions:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', display: 'grid', gap: '6px' }}>
              <li><strong>Finance</strong> — Standard formulas from textbook financial mathematics, government tax portals (like the Income Tax Department of India), central bank regulations (RBI), and regulatory bodies (SEBI).</li>
              <li><strong>Health</strong> — Peer-reviewed medical papers, the World Health Organization (WHO), and institutions like the CDC.</li>
              <li><strong>Engineering &amp; Math</strong> — Standard academic textbooks and international engineering handbooks.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>2. Rigorous Verification and Testing</h2>
            <p>
              Before a calculator is launched on Calc Labz, it undergoes three rounds of testing:
            </p>
            <ol style={{ paddingLeft: '20px', margin: '10px 0', display: 'grid', gap: '6px' }}>
              <li><strong>Formula Validation:</strong> Code implementations are compared against manual spreadsheet calculations step-by-step.</li>
              <li><strong>Edge-Case Analysis:</strong> We test extreme inputs (e.g., zero rates, high tenures, empty strings) to ensure results handle errors or display clean notifications.</li>
              <li><strong>Cross-Checking:</strong> We compare outputs against other respected online calculators to ensure absolute alignment.</li>
            </ol>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>3. Active Updates and Maintenance</h2>
            <p>
              Finance laws, interest rates, tax brackets, and medical guidelines change. We actively monitor these changes:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', display: 'grid', gap: '6px' }}>
              <li><strong>Indian Tax Slabs:</strong> Automatically reviewed and updated immediately after the annual Indian Union Budget is passed.</li>
              <li><strong>Small Savings Interest Rates:</strong> FD, RD, and PPF calculators are checked periodically for changes in post office or commercial bank benchmark rates.</li>
              <li><strong>Clinically Validated Math:</strong> Health guides are revised if major medical organizations update recommendations or thresholds.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>4. Transparency in Methodology</h2>
            <p>
              We believe in &quot;showing our work.&quot; Each calculator includes an inline methodology section describing:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', display: 'grid', gap: '6px' }}>
              <li>The exact mathematical formula used (e.g., compounding frequencies).</li>
              <li>Definitions for every input parameter.</li>
              <li>Practical examples to help users follow along.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>5. Reporting Corrections and Discrepancies</h2>
            <p>
              Even with rigorous testing, errors can happen. If you spot a discrepancy, a mathematical bug, or an outdated rate, please let us know immediately.
            </p>
            <p style={{ marginTop: '8px' }}>
              Send an email to <a href="mailto:support@calclabz.com" style={{ color: 'var(--p2)', textDecoration: 'underline' }}>support@calclabz.com</a> or use our <Link href="/contact" style={{ color: 'var(--p2)', textDecoration: 'underline' }}>Contact Form</Link>. We investigate and fix verified math issues within 24 hours of reporting.
            </p>
          </div>
        </section>

        <footer style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid var(--brd)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--txt2)', margin: 0 }}>
            <strong>Last updated:</strong> April 2026
          </p>
        </footer>
      </article>
    </div>
  );
}
