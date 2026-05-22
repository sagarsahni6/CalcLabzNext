'use client';

import Icon from '@/components/ui/Icon';

export default function HeroSearchTrigger() {
  return (
    <div
      className="hero-search-trigger"
      role="button"
      tabIndex={0}
      onClick={() => window.dispatchEvent(new CustomEvent('open-cmd-palette'))}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('open-cmd-palette'));
        }
      }}
    >
      <Icon name="fa-search" />
      <span>Search 300+ calculators...</span>
      <kbd>Ctrl+K</kbd>
    </div>
  );
}
