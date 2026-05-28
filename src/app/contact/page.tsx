import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Icon from '@/components/ui/Icon';
import FeedbackForm from '@/components/ui/FeedbackForm';

export const metadata: Metadata = {
  title: 'Contact Us — Calc Labz Support & Feedback',
  description: 'Get in touch with the Calc Labz team. Send us feedback, calculator suggestions, report a calculation issue, or inquire about partnership opportunities.',
  alternates: {
    canonical: 'https://calclabz.com/contact',
  },
};

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Calc Labz',
    description: 'Get in touch with the Calc Labz team for feedback, calculator suggestions, or partnership opportunities.',
    url: 'https://calclabz.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Calc Labz',
      url: 'https://calclabz.com',
      email: 'support@calclabz.com',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@calclabz.com',
        contactType: 'customer support',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'IN',
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
      { '@type': 'ListItem', position: 2, name: 'Contact Us', item: 'https://calclabz.com/contact' },
    ],
  };

  return (
    <div className="pulse">
      {/* JSON-LD Structured Data */}
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Script
        id="contact-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>Contact Us</span>
      </nav>

      <div className="card" style={{ marginTop: '12px' }}>
        <header className="calc-hdr" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, var(--p2), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 12px' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--txt1)', lineHeight: 1.75 }}>
            Have feedback, noticed an error in a calculator, or want to suggest a new tool? We are always happy to hear from you. Send us a message and we will get back to you as soon as possible.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {/* Direct contact info */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', display: 'flex', alignItems: 'center' }}>
                <Icon name="fa-envelope" style={{ color: 'var(--p2)', marginRight: '10px' }} /> Email Us
              </h2>
              <p style={{ color: 'var(--txt1)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                For general support, feedback, bug reports, and business opportunities, please email us directly at:
              </p>
              <a href="mailto:support@calclabz.com" style={{ display: 'inline-block', color: 'var(--p2)', fontWeight: 600, fontSize: '1.05rem', marginTop: '6px', textDecoration: 'underline' }}>
                support@calclabz.com
              </a>
            </div>

            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', display: 'flex', alignItems: 'center' }}>
                <Icon name="fa-clock" style={{ color: 'var(--p2)', marginRight: '10px' }} /> Response Time
              </h2>
              <p style={{ color: 'var(--txt1)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                We typically read and reply to all emails within <strong>24 to 48 hours</strong>.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', display: 'flex', alignItems: 'center' }}>
                <Icon name="fa-location-dot" style={{ color: 'var(--p2)', marginRight: '10px' }} /> Location
              </h2>
              <p style={{ color: 'var(--txt1)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                We are headquartered in <strong>Delhi, India</strong>, operating on Indian Standard Time (IST).
              </p>
            </div>
          </section>

          {/* Contact form (interactive AJAX version integrated with Web3Forms API) */}
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}
