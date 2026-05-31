/* ═══════════════════════════════════════════════════
   JsonLd — Raw <script type="application/ld+json"> renderer
   
   IMPORTANT: We deliberately use raw <script> tags instead of
   next/Script. next/Script with any strategy other than
   'beforeInteractive' causes JSON-LD to be injected after
   initial HTML, making it invisible to Googlebot on the
   first crawl. Raw <script> tags in Server Components are
   always present in the SSR HTML.
   ═══════════════════════════════════════════════════ */

interface JsonLdProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | Record<string, any>[];
}

/**
 * Renders one or more JSON-LD schema objects as a raw <script> tag.
 * This is a Server Component — no 'use client' directive.
 *
 * @example
 * <JsonLd id="website-schema" data={websiteSchema} />
 * <JsonLd id="calc-schemas" data={[schema1, schema2, schema3]} />
 */
export default function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
