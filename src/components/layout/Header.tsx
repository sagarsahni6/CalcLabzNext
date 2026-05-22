'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { findCalcBySlug } from '@/data/calculator-db';
import Icon from '@/components/ui/Icon';

function CalcLabzLogo() {
  return (
    <svg viewBox="0 0 160 34" height={30} width={140} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Calc Labz logo">
      {/* Beaker icon */}
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#004C8F" />
          <stop offset="100%" stopColor="#003D75" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#logo-grad)" />
      {/* Beaker outline */}
      <path d="M12 8v6l-3 8h14l-3-8V8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="11" y1="8" x2="21" y2="8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Liquid inside */}
      <path d="M11.5 18h9" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
      {/* Bubbles */}
      <circle cx="14" cy="15" r="1" fill="rgba(255,255,255,0.6)"/>
      <circle cx="17.5" cy="13.5" r="0.7" fill="rgba(255,255,255,0.4)"/>
      {/* Text: Calc */}
      <text x="38" y="22" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="17" fill="currentColor">
        Calc
      </text>
      {/* Text: Labz */}
      <text x="85" y="22" fontFamily="Inter, system-ui, sans-serif" fontWeight="500" fontSize="17" fill="currentColor" opacity="0.7">
        Labz
      </text>
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>).findCalcBySlug = findCalcBySlug;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll(); // initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    document.getElementById('sidebar')?.classList.toggle('open');
    document.body.classList.toggle('sidebar-open');
  };

  return (
    <header className={`hdr${scrolled ? ' hdr-scrolled' : ''}`}>
      <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle menu">
        <Icon name="fa-bars" />
      </button>

      <div className="hdr-logo">
        <Link href="/">
          <CalcLabzLogo />
        </Link>
      </div>

      <div
        className="hdr-search"
        onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('open-cmd-palette'))}
        style={{ cursor: 'pointer' }}
      >
        <Icon name="fa-search" className="search-icon-inside" />
        <input
          type="text"
          placeholder="Search 300+ calculators... (Ctrl+K)"
          readOnly
          style={{ cursor: 'pointer' }}
          aria-label="Search calculators"
        />
      </div>

      <div className="hdr-actions">
        <button
          className="hdr-search-trigger-mobile"
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('open-cmd-palette'))}
          title="Search calculators"
          aria-label="Search calculators"
        >
          <Icon name="fa-search" />
        </button>
      </div>
    </header>
  );
}
