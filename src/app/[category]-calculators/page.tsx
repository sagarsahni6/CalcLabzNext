import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { DB, getCalcsByCategory, getSlugForId } from '@/data/calculator-db';
import { CATEGORY_META, CalculatorCategory } from '@/types/calculator';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import CategoryCalculatorList from '@/components/calculator/CategoryCalculatorList';

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

  const title = `${catMeta.name} Calculators — Free Online Tools | Calc Labz`;
  const description = `Free online ${catMeta.name.toLowerCase()} calculators. ${catMeta.description}. Accuracy guaranteed, instant results, works offline.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://calclabz.com/${category}-calculators`,
      type: 'website',
    },
    alternates: {
      canonical: `https://calclabz.com/${category}-calculators`,
    },
  };
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

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${catMeta.name} Calculators`,
    description: `Free online ${catMeta.name.toLowerCase()} calculators. ${catMeta.description}`,
    url: `https://calclabz.com/${category}-calculators`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Calc Labz',
      url: 'https://calclabz.com',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: calcs.length,
      itemListElement: calcs.slice(0, 50).map((id, index) => {
        const calc = DB[id];
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: calc.name,
          url: `https://calclabz.com/${getSlugForId(id)}`,
        };
      }),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://calclabz.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${catMeta.name} Calculators`,
        item: `https://calclabz.com/${category}-calculators`,
      },
    ],
  };

  return (
    <div className="card">
      {/* JSON-LD Structured Data */}
      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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
          calc: DB[id],
          slug: getSlugForId(id)
        }))}
        categoryKey={catKey}
        categoryColor={catMeta.color}
      />
    </div>
  );
}
