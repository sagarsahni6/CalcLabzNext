/* ═══════════════════════════════════════════════════
   Calc Labz — Ad Slot Placeholder Component
   CLS-safe ad container with reserved space.
   Prevents layout shift when ad scripts load later.
   ═══════════════════════════════════════════════════ */

interface AdSlotProps {
  /**
   * Ad zone identifier — maps to CSS class for sizing:
   * - 'header' → below breadcrumb, above calculator (90px)
   * - 'results' → between results and related calcs (250px)
   * - 'sidebar' → right column desktop only (600px, sticky)
   * - 'footer' → above site footer (90px)
   * - 'blog-mid' → mid-article in blog posts (250px)
   */
  zone: 'header' | 'results' | 'sidebar' | 'footer' | 'blog-mid';

  /** Optional unique ID for targeting specific ad units */
  id?: string;
}

/**
 * CLS-safe ad placeholder.
 * Renders a min-height container that reserves space for ad scripts.
 * Ad scripts (e.g. AdSense) should be loaded after LCP and target
 * these containers by their data-ad-zone attribute.
 */
export default function AdSlot({ zone, id }: AdSlotProps) {
  return (
    <div
      className={`ad-slot ad-slot-${zone}`}
      data-ad-zone={zone}
      id={id || `ad-${zone}`}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Ad content will be injected here by ad scripts after LCP */}
    </div>
  );
}
