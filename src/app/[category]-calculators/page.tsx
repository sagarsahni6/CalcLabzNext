import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DB, getCalcsByCategory, getSlugForId } from '@/data/calculator-db';
import { CATEGORY_META, CalculatorCategory } from '@/types/calculator';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import CategoryCalculatorList from '@/components/calculator/CategoryCalculatorList';
import JsonLd from '@/components/seo/JsonLd';
import { getCategorySchemas } from '@/lib/seo/schema';
import { generateCategoryMetadata } from '@/lib/seo/metadata';

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((cat) => ({
    category: cat,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const catKey = category as CalculatorCategory;
  const catMeta = CATEGORY_META[catKey];
  if (!catMeta) return {};

  // Use metadata factory for consistent SEO metadata across all category pages.
  // keywords intentionally omitted — Google ignores them since 2009.
  return generateCategoryMetadata(catMeta.name, catMeta.description, `${category}-calculators`);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const catKey = category as CalculatorCategory;
  const catMeta = CATEGORY_META[catKey];
  if (!catMeta) notFound();

  const calcs = getCalcsByCategory(catKey);

  // Use centralized schema factory — generates CollectionPage + BreadcrumbList
  const categorySchemas = getCategorySchemas({
    catName: catMeta.name,
    catDesc: catMeta.description,
    slug: `${category}-calculators`,
    calcs: calcs.map((id) => ({
      id,
      name: DB[id].name,
      desc: DB[id].desc,
      url: `https://calclabz.com/${getSlugForId(id)}`,
    })),
  });

  return (
    <div className="card">
      {/* JSON-LD Structured Data — raw <script> for SSR HTML visibility to Googlebot */}
      <JsonLd id="category-schemas" data={categorySchemas} />

      {/* Breadcrumb */}
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <span>{catMeta.name} Calculators</span>
      </nav>

      {/* Category Header */}
      <div className="calc-hdr" style={{ marginBottom: '24px' }}>
        <div className="calc-title-row" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="fc-ico" style={{ background: catMeta.color, width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', marginRight: '16px', flexShrink: 0 }}>
            <Icon name={catMeta.icon} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--fg)' }}>{catMeta.name} Calculators</h1>
            <p style={{ margin: '4px 0 0', color: 'var(--fg-muted)', fontSize: '1.1rem' }}>{catMeta.description}</p>
          </div>
        </div>
      </div>

      {/* Calculators Grid & Interactive List */}
      <CategoryCalculatorList
        initialCalcs={calcs.map((id) => ({
          id,
          calc: {
            name: DB[id].name,
            desc: DB[id].desc,
            icon: DB[id].icon,
            badge: DB[id].badge,
          },
          slug: getSlugForId(id),
        }))}
        categoryKey={catKey}
        categoryColor={catMeta.color}
      />
    </div>
  );
}
