'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from '@/components/ui/Icon';

export default function MobileNav() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const handleHash = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const triggerSearch = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cmd-palette'));
    }
  };


  return (
    <nav className="mobile-nav-bar" aria-label="Mobile Navigation">
      <Link href="/" className={`mobile-nav-item ${pathname === '/' ? 'active' : ''}`}>
        <Icon name="fa-house" />
        <span>Home</span>
      </Link>
      <button onClick={triggerSearch} className="mobile-nav-item" aria-label="Search site">
        <Icon name="fa-search" />
        <span>Search</span>
      </button>
      <Link href="/dashboard#favorites" className={`mobile-nav-item ${pathname === '/dashboard' && activeHash === '#favorites' ? 'active' : ''}`}>
        <Icon name="fa-heartbeat" style={{ color: 'var(--rose)' }} />
        <span>Favorites</span>
      </Link>
      <Link href="/dashboard" className={`mobile-nav-item ${pathname === '/dashboard' && activeHash !== '#favorites' ? 'active' : ''}`}>
        <Icon name="fa-chart-line" />
        <span>History</span>
      </Link>
    </nav>
  );
}
