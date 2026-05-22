import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Calc Labz',
  description: 'Review the Terms of Service for Calc Labz. Learn about terms of use, intellectual property, disclaimer of warranty, and our general guidelines.',
  alternates: {
    canonical: 'https://calclabz.com/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="pulse">
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>Terms of Service</span>
      </nav>

      <article className="card" style={{ marginTop: '12px' }}>
        <header className="calc-hdr" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, var(--p2), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 12px' }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--txt1)', lineHeight: 1.75 }}>
            Welcome to Calc Labz. These Terms of Service govern your access to and use of calclabz.com. By accessing or using our platform, you agree to comply with and be bound by these terms.
          </p>
        </header>

        <section style={{ display: 'grid', gap: '24px', fontSize: '0.92rem', color: 'var(--txt1)', lineHeight: 1.7 }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--txt)' }}>1. Educational and Informational Use Only</h2>
            <p>
              All calculation tools, outputs, formulas, and guides provided on Calc Labz are meant purely for <strong>educational and general informational purposes</strong>.
            </p>
            <p style={{ marginTop: '8px' }}>
              We do not provide licensed financial, medical, engineering, or legal advice. The calculations performed by our tools are approximations based on generalized mathematical formulas and should not be relied upon as the sole basis for high-stakes financial decisions, medical diagnoses, or structural engineering plans.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>2. Disclaimer of Warranties and Accuracy</h2>
            <p>
              While we make every effort to verify our formulas, tax rates, and guidelines in accordance with our <Link href="/editorial-policy" style={{ color: 'var(--p2)', textDecoration: 'underline' }}>Editorial Policy</Link>, <strong>Calc Labz is provided &quot;as is&quot; without any warranty of any kind, express or implied.</strong>
            </p>
            <p style={{ marginTop: '8px' }}>
              We do not guarantee that the calculators will always produce 100% correct, bug-free, or up-to-date results. Interest calculations, tax slabs, or health indices may vary based on localized rules, banking rules, or medical updates.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>3. Intellectual Property Rights</h2>
            <p>
              The code, design system, custom icons, graphics, content structure, and unique calculations on Calc Labz are the exclusive property of <strong>Calc Labz and Sagar Sahni</strong>, and are protected under copyright and trademark laws.
            </p>
            <p style={{ marginTop: '8px' }}>
              You may use our calculators for your personal or commercial research needs. However, scraping, copying, framing, or republishing the website&apos;s code or full content without prior written permission is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>4. Limitation of Liability</h2>
            <p>
              In no event shall Calc Labz, its authors, partners, or Sagar Sahni be held liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our tools, or from any errors or omissions in calculations.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>5. Links to Third-Party Websites</h2>
            <p>
              Our website may contain links to external sites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>6. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of <strong>India</strong>, without regard to its conflict of law provisions.
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
