import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer — Calc Labz',
  description: 'Read the general disclaimer for Calc Labz. All calculation results are estimates and should not replace professional financial, medical, or legal advice.',
  alternates: {
    canonical: 'https://calclabz.com/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="pulse">
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>Disclaimer</span>
      </nav>

      <article className="card" style={{ marginTop: '12px' }}>
        <header className="calc-hdr" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, var(--p2), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 12px' }}>
            General Disclaimer
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--txt1)', lineHeight: 1.75 }}>
            By using calclabz.com, you acknowledge and agree to the disclaimers listed below. If you do not agree, please exit the site and do not use our tools.
          </p>
        </header>

        <section style={{ display: 'grid', gap: '24px', fontSize: '0.92rem', color: 'var(--txt1)', lineHeight: 1.7 }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--txt)' }}>1. Financial Disclaimer</h2>
            <p>
              The financial calculators on Calc Labz (including but not limited to EMI, SIP, Lumpsum, GST, Income Tax, FD, RD, and PPF calculators) are intended for <strong>estimation purposes only</strong>.
            </p>
            <p style={{ marginTop: '8px' }}>
              The actual rates, compounding methodologies, processing fees, and amortization logic used by banks or financial institutions may differ from our simplified calculations. Tax calculations are subject to updates, changes in finance bills, and individual deductions that our tool may not fully capture.
            </p>
            <p style={{ marginTop: '8px', color: 'var(--gold)', fontWeight: 600 }}>
              Always consult a certified financial planner (CFP) or a chartered accountant (CA) before signing loan agreements, making capital investments, or filing tax returns.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>2. Health and Fitness Disclaimer</h2>
            <p>
              Health and fitness calculators (including BMI, BMR, TDEE, Heart Rate, and Ideal Weight calculators) utilize general mathematical formulas established in medical research.
            </p>
            <p style={{ marginTop: '8px' }}>
              These estimations do not account for muscle mass, bone density, hydration, metabolic conditions, or individual genetic traits. The results do not constitute medical advice, diagnoses, or custom athletic prescriptions.
            </p>
            <p style={{ marginTop: '8px', color: 'var(--gold)', fontWeight: 600 }}>
              Never start a rigorous weight loss diet, intense fitness regimen, or make medical decisions without consulting a qualified medical doctor or registered dietician.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>3. General Accuracy and Methodologies</h2>
            <p>
              We pride ourselves on the transparency of our <Link href="/editorial-policy" style={{ color: 'var(--p2)', textDecoration: 'underline' }}>Editorial Policy</Link>. However, Calc Labz makes no representation, guarantee, or warranty regarding the accuracy, completeness, or suitability of the calculators for any specific use case.
            </p>
            <p style={{ marginTop: '8px' }}>
              Users are encouraged to manually verify calculations using the documented formulas provided alongside each tool.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>4. No Professional-Client Relationship</h2>
            <p>
              Your use of this website does not establish a professional-client or advisory relationship between you and Calc Labz or Sagar Sahni. All services and features are provided free of charge, with no service level agreements (SLAs).
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
