import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Calc Labz',
  description: 'Read the Privacy Policy of Calc Labz. Learn why we do not collect your personal details, and how all calculation logic runs entirely inside your browser.',
  alternates: {
    canonical: 'https://calclabz.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="pulse">
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>Privacy Policy</span>
      </nav>

      <article className="card" style={{ marginTop: '12px' }}>
        <header className="calc-hdr" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, var(--p2), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 12px' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--txt1)', lineHeight: 1.75 }}>
            At Calc Labz, accessible from calclabz.com, one of our main priorities is the privacy of our visitors. This Privacy Policy outlines what information is collected, how it is handled, and our commitment to absolute data privacy.
          </p>
        </header>

        <section style={{ display: 'grid', gap: '24px', fontSize: '0.92rem', color: 'var(--txt1)', lineHeight: 1.7 }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--txt)' }}>1. Absolute Client-Side Privacy</h2>
            <p>
              We believe your personal numbers should remain yours alone. Unlike traditional platforms that perform calculations on backend servers, <strong>Calc Labz runs 100% of its calculation logic entirely in your web browser.</strong>
            </p>
            <p style={{ marginTop: '8px' }}>
              Any number, amount, rate, or status you input into our calculators is processed locally on your device via client-side JavaScript. <strong>None of your calculator inputs are transmitted to our servers, recorded in database logs, or shared with third parties.</strong>
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>2. Information We Collect</h2>
            <p>
              We do not ask you to register, sign up, provide an email address, or verify a phone number to use any tool on our site.
            </p>
            <p style={{ marginTop: '8px' }}>
              The only standard logs we collect are basic web-server diagnostic logs, including IP address, browser user-agent, operating system, and timestamp of the request. These logs are used exclusively for website monitoring, preventing security abuse, and optimizing page load speeds. They are automatically deleted after 30 days.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>3. Cookies and Web Beacons</h2>
            <p>
              Like any other website, Calc Labz uses &quot;cookies&quot; to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>4. Google DoubleClick DART Cookie</h2>
            <p>
              Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to calclabz.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--p2)', textDecoration: 'underline' }}>policies.google.com/technologies/ads</a>.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>5. Third Party Privacy Policies</h2>
            <p>
              Calc Labz&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p style={{ marginTop: '8px' }}>
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>6. GDPR and CCPA Data Protection Rights</h2>
            <p>
              We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '8px 0', display: 'grid', gap: '6px' }}>
              <li><strong>The right to access</strong> — You have the right to request copies of your personal data. (Since we collect no personal data, any such request is trivial).</li>
              <li><strong>The right to rectification</strong> — You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> — You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> — You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '20px 0 8px', color: 'var(--txt)' }}>7. Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
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
