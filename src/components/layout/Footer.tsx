import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>Calc Labz</h4>
          <p className="footer-desc">
            300+ free online calculators for finance, health, math, education, engineering &amp; more.
            Instant results, no signup, works offline.
          </p>
        </div>
        <div>
          <h4>Popular</h4>
          <div className="footer-links">
            <Link href="/emi-calculator">EMI Calculator</Link>
            <Link href="/sip-calculator">SIP Calculator</Link>
            <Link href="/gst-calculator">GST Calculator</Link>
            <Link href="/bmi-calculator">BMI Calculator</Link>
            <Link href="/incometax-calculator">Income Tax Calculator</Link>
          </div>
        </div>
        <div>
          <h4>Categories</h4>
          <div className="footer-links">
            <Link href="/finance-calculators">Finance</Link>
            <Link href="/health-calculators">Health &amp; Fitness</Link>
            <Link href="/math-calculators">Math</Link>
            <Link href="/engineering-calculators">Engineering</Link>
            <Link href="/construction-calculators">Construction</Link>
          </div>
        </div>
        <div>
          <h4>Company</h4>
          <div className="footer-links">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2024-{new Date().getFullYear()} Calc Labz. All rights reserved.
      </div>
    </footer>
  );
}
