'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { CATEGORY_META, CalculatorCategory } from '@/types/calculator';
import { getCalcsByCategory } from '@/data/calculator-db';
import Icon from '@/components/ui/Icon';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = useCallback(() => {
    document.getElementById('sidebar')?.classList.remove('open');
    document.body.classList.remove('sidebar-open');
    setIsOpen(false);
  }, []);

  // Listen for sidebar toggle events from Header/MobileNav hamburger buttons
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const sidebar = document.getElementById('sidebar');
      const open = sidebar?.classList.contains('open') ?? false;
      setIsOpen(open);
    });
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    }
    return () => observer.disconnect();
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  return (
    <>
      {/* Overlay — clickable scrim that closes the sidebar on tap */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      <aside className="sidebar" id="sidebar">
        <nav className="qbtns">
          <Link href="/" id="qHome" className={`qbtn ${pathname === '/' ? 'active' : ''}`}>
            <Icon name="fa-house" /> Home
          </Link>
          <Link href="/dashboard" id="qDash" className={`qbtn ${pathname === '/dashboard' ? 'active' : ''}`}>
            <Icon name="fa-chart-line" /> Dashboard
          </Link>
          <Link href="/blog" id="qBlog" className={`qbtn ${pathname === '/blog' ? 'active' : ''}`}>
            <Icon name="fa-newspaper" /> Guides
          </Link>
        </nav>

        <div id="catList">
          {(Object.entries(CATEGORY_META) as [CalculatorCategory, typeof CATEGORY_META[CalculatorCategory]][]).map(([key, cat]) => {
            const isActive = pathname?.includes(`${key}-calculators`);
            return (
              <div className="cat-item" key={key}>
                <Link
                  href={`/${key}-calculators`}
                  className={`cat-btn ${isActive ? 'active' : ''}`}
                >
                  <span className="cat-ico" style={{ background: cat.color }}>
                    <Icon name={cat.icon} />
                  </span>
                  <span className="cat-lbl">{cat.name}</span>
                  <span className="cat-count">{getCalcsByCategory(key).length}</span>
                  <Icon name="fa-chevron-right" className="cat-arr" />
                </Link>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
