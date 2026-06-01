import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand Column */}
        <div>
          <h4>Calc Labz</h4>
          <p className="footer-desc">
            300+ free online calculators for finance, health, math, education, engineering &amp; more.
            Instant results, no signup, works offline as a PWA.
          </p>
          <div className="footer-links" style={{ marginTop: '12px' }}>
            <Link href="/author/sagar-sahni">By Sagar Sahni</Link>
            <Link href="/editorial-policy">Editorial Policy</Link>
          </div>
        </div>

        {/* Popular Calculators */}
        <div>
          <h4>Popular</h4>
          <div className="footer-links">
            <Link href="/emi-calculator">EMI Calculator</Link>
            <Link href="/sip-calculator">SIP Calculator</Link>
            <Link href="/gst-calculator">GST Calculator</Link>
            <Link href="/bmi-calculator">BMI Calculator</Link>
            <Link href="/incometax-calculator">Income Tax Calculator</Link>
            <Link href="/compound-interest-calculator">Compound Interest</Link>
            <Link href="/retirement-corpus-calculator">Retirement Corpus</Link>
            <Link href="/cagr-calculator">CAGR Calculator</Link>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4>Categories</h4>
          <div className="footer-links">
            <Link href="/finance-calculators">Finance</Link>
            <Link href="/health-calculators">Health &amp; Fitness</Link>
            <Link href="/math-calculators">Math</Link>
            <Link href="/everyday-calculators">Everyday</Link>
            <Link href="/engineering-calculators">Engineering</Link>
            <Link href="/science-calculators">Science</Link>
            <Link href="/education-calculators">Education</Link>
            <Link href="/construction-calculators">Construction</Link>
            <Link href="/datetime-calculators">Date &amp; Time</Link>
            <Link href="/unit-calculators">Unit Conversion</Link>
          </div>
        </div>

        {/* Resources & Company */}
        <div>
          <h4>Resources</h4>
          <div className="footer-links">
            <Link href="/blog">Financial Guides</Link>
            <Link href="/dashboard" rel="nofollow">My Dashboard</Link>
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
