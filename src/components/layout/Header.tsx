'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { findCalcBySlug } from '@/data/calculator-db';
import { CATEGORY_META, CalculatorCategory } from '@/types/calculator';
import Icon from '@/components/ui/Icon';
import { useTheme } from '@/components/layout/ThemeProvider';

function CalcLabzLogo() {
  return (
    <svg viewBox="0 0 160 34" height={30} width={140} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Calc Labz logo">
      {/* Beaker icon */}
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
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
  const [catOpen, setCatOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  // Close category dropdown when clicking outside
  useEffect(() => {
    if (!catOpen) return;
    const handleClick = () => setCatOpen(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [catOpen]);

  const toggleSidebar = () => {
    document.getElementById('sidebar')?.classList.toggle('open');
    document.body.classList.toggle('sidebar-open');
  };

  const categories = Object.entries(CATEGORY_META) as [CalculatorCategory, typeof CATEGORY_META[CalculatorCategory]][];

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

      {/* Desktop navigation links */}
      <nav className="hdr-nav">
        <Link href="/" className="hdr-nav-link">
          <Icon name="fa-house" /> Home
        </Link>
        <div className="hdr-nav-dropdown" onClick={(e) => { e.stopPropagation(); setCatOpen(!catOpen); }}>
          <button className="hdr-nav-link" aria-expanded={catOpen} aria-haspopup="true">
            <Icon name="fa-border-all" /> Categories <Icon name="fa-chevron-down" className={`hdr-nav-chevron${catOpen ? ' open' : ''}`} />
          </button>
          {catOpen && (
            <div className="hdr-dropdown-menu">
              {categories.map(([key, cat]) => (
                <Link
                  key={key}
                  href={`/${key}-calculators`}
                  className="hdr-dropdown-item"
                  onClick={() => setCatOpen(false)}
                >
                  <span className="hdr-dropdown-ico" style={{ background: cat.color }}>
                    <Icon name={cat.icon} />
                  </span>
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link href="/dashboard" className="hdr-nav-link">
          <Icon name="fa-chart-line" /> Dashboard
        </Link>
        <Link href="/blog" className="hdr-nav-link">
          <Icon name="fa-newspaper" /> Guides
        </Link>
      </nav>

      <div className="hdr-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <Icon name={theme === 'light' ? 'fa-moon' : 'fa-sun'} />
        </button>
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
