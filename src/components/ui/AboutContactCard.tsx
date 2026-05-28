'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export default function AboutContactCard() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('support@calclabz.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="about-contact-card">
      <div className="about-contact-row">
        <span className="contact-icon">
          <Icon name="fa-envelope" />
        </span>
        <span>
          <a href="mailto:support@calclabz.com" style={{ color: 'var(--p)', fontWeight: 600 }}>
            support@calclabz.com
          </a>
        </span>
        <button
          className="about-copy-btn"
          onClick={copyEmail}
          title="Copy email address"
        >
          <Icon name={copied ? 'fa-check' : 'fa-copy'} style={{ width: '14px', height: '14px' }} />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="about-contact-row">
        <span className="contact-icon">
          <Icon name="fa-globe" />
        </span>
        <span>
          <Link href="/contact" style={{ color: 'var(--p)', fontWeight: 600 }}>
            calclabz.com/contact
          </Link>
        </span>
      </div>
      <div className="about-contact-row">
        <span className="contact-icon">
          <Icon name="fa-code-branch" />
        </span>
        <span>
          <a href="https://github.com/sagarsahni6" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--p)', fontWeight: 600 }}>
            github.com/sagarsahni6
          </a>
        </span>
      </div>
      <p style={{ fontSize: '0.82rem', color: 'var(--txt2)', margin: '8px 0 0', fontStyle: 'italic' }}>
        💬 We typically respond within 24 hours.
      </p>
    </div>
  );
}
