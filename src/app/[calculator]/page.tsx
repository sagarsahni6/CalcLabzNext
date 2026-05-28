import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { DB, findCalcBySlug, getAllCalculatorSlugs, getRegistryEntry, getSlugForId, getCalcsByCategory } from '@/data/calculator-db';
import { CATEGORY_META, CalculatorCategory } from '@/types/calculator';
import { BLOG_POSTS } from '@/data/blog-db';
import CalculatorWidget from '@/components/calculator/CalculatorWidget';
import FavoriteToggle from '@/components/calculator/FavoriteToggle';
import CalculatorTabs from '@/components/calculator/CalculatorTabs';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { getSchemaCategory, generateSEOContent, generateHowToSteps, getCategorySEOIntro, generateCategoryFAQs } from '@/lib/seo-content-generator';
import { getCrossCategoryLinks } from '@/lib/related-calculators';

// ── STATIC GENERATION ─────────────────────────────
export function generateStaticParams() {
  const calcSlugs = getAllCalculatorSlugs().map((slug) => ({
    calculator: slug,
  }));
  const catSlugs = Object.keys(CATEGORY_META).map((cat) => ({
    calculator: `${cat}-calculators`,
  }));
  return [...calcSlugs, ...catSlugs];
}

// ── DYNAMIC METADATA ──────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ calculator: string }>;
}): Promise<Metadata> {
  const { calculator: slug } = await params;

  if (slug.endsWith('-calculators')) {
    const catKey = slug.replace('-calculators', '') as CalculatorCategory;
    const catMeta = CATEGORY_META[catKey];
    if (!catMeta) return {};

    const title = `Best ${catMeta.name} Calculators Online (2026) — Free & Offline | Calc Labz`;
    const description = `Access our complete suite of free online ${catMeta.name.toLowerCase()} calculators. ${catMeta.description}. All calculators are 100% free, run client-side for maximum privacy, and work offline as PWAs.`;
    const keywords = `${catMeta.name.toLowerCase()} calculators, free online ${catMeta.name.toLowerCase()} calculator, best ${catMeta.name.toLowerCase()} tools, calc labz, offline calculators`;

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: `https://calclabz.com/${slug}`,
        type: 'website',
        siteName: 'Calc Labz',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: `https://calclabz.com/${slug}`,
      },
    };
  }

  const calcId = findCalcBySlug(slug);
  if (!calcId || !DB[calcId]) return {};

  const calc = DB[calcId];
  const registry = getRegistryEntry(slug);
  const catMeta = CATEGORY_META[calc.cat];

  // SEO-optimized title: includes year, "Online", category context
  const title = registry?.title || `${calc.name} Online (2026) — Free ${catMeta.name} Calculator India | Calc Labz`;
  const description = registry?.desc || `Free ${calc.name.toLowerCase()} — ${calc.desc}. Instant results, verified formulas, no signup. Try the best online ${calc.name.toLowerCase()} on Calc Labz.`;

  // Build keyword list from calculator metadata
  const keywords = [
    calc.name.toLowerCase(),
    `${calc.name.toLowerCase()} online`,
    `free ${calc.name.toLowerCase()}`,
    `${calc.name.toLowerCase()} india`,
    `${calc.name.toLowerCase()} 2026`,
    `${catMeta.name.toLowerCase()} calculator`,
    'calc labz',
    'online calculator',
  ].join(', ');

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Sagar Sahni', url: 'https://calclabz.com/author/sagar-sahni' }],
    openGraph: {
      title,
      description,
      url: `https://calclabz.com/${slug}`,
      type: 'website',
      siteName: 'Calc Labz',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@calclabz',
    },
    alternates: {
      canonical: `https://calclabz.com/${slug}`,
    },
    other: {
      'article:author': 'https://calclabz.com/author/sagar-sahni',
      'article:published_time': '2024-01-01T00:00:00Z',
      'article:modified_time': '2026-05-22T00:00:00Z',
    },
  };
}

// ── FORMULA & EXAMPLES DATA ───────────────────────
function getFormulaData(id: string) {
  if (id === 'emi') {
    return {
      formula: `E = P \\cdot r \\cdot \\frac{(1+r)^n}{(1+r)^n - 1}`,
      formulaDesc: `Where:
- **E** is the monthly EMI (Equated Monthly Installment).
- **P** is the Principal Loan Amount.
- **r** is the Monthly Interest Rate (Annual Rate / 12 / 100).
- **n** is the Loan Tenure in months.`,
      example: `Suppose you borrow **₹10,00,000** (P) at an annual interest rate of **8.5%** for **10 years** (120 months).
- Monthly interest rate (r) = 8.5 / 12 / 100 = 0.007083
- EMI (E) = 10,00,000 × 0.007083 × (1.007083)^120 / ((1.007083)^120 - 1)
- **E ≈ ₹12,399 per month**`
    };
  }
  if (id === 'sip') {
    return {
      formula: `M = P \\cdot \\frac{(1+i)^n - 1}{i} \\cdot (1+i)`,
      formulaDesc: `Where:
- **M** is the Maturity Amount.
- **P** is the Monthly SIP Amount.
- **i** is the Monthly Interest Rate (Annual expected return / 12 / 100).
- **n** is the Number of Monthly Payments.`,
      example: `Suppose you invest **₹5,000 per month** (P) for **15 years** (180 months) with an expected annual return of **12%**.
- Monthly return rate (i) = 12 / 12 / 100 = 0.01
- Maturity Amount (M) = 5,000 × ((1.01)^180 - 1) / 0.01 × (1.01)
- **M ≈ ₹25,22,880**`
    };
  }
  if (id === 'gst') {
    return {
      formula: `GST = \\frac{Original \\; Price \\times GST \\; Rate}{100}`,
      formulaDesc: `For adding GST:
- **Total Price = Original Price + GST Amount**

For removing GST:
- **Original Price = Total Price / (1 + Rate / 100)**
- **GST Amount = Total Price - Original Price**`,
      example: `Suppose the net price of an item is **₹1,000** and GST rate is **18%**.
- GST Amount = (1,000 × 18) / 100 = **₹180**
- Total Price including GST = 1,000 + 180 = **₹1,180**`
    };
  }
  if (id === 'compoundinterest') {
    return {
      formula: `A = P \\cdot \\left(1 + \\frac{r}{n}\\right)^{nt}`,
      formulaDesc: `Where:
- **A** is the final maturity amount.
- **P** is the principal balance.
- **r** is the annual interest rate (decimal).
- **n** is the number of times interest compounds per year.
- **t** is the time in years.`,
      example: `Suppose you invest **₹1,00,000** at **8%** interest compounded quarterly (n = 4) for **5 years**.
- A = 1,00,000 × (1 + 0.08 / 4)^(4 × 5)
- A = 1,00,000 × (1.02)^20
- **A ≈ ₹1,48,595** (Interest earned: **₹48,595**)`
    };
  }
  if (id === 'simpleinterest') {
    return {
      formula: `SI = \\frac{P \\cdot R \\cdot T}{100}`,
      formulaDesc: `Where:
- **SI** is the Simple Interest.
- **P** is the Principal Amount.
- **R** is the Rate of Interest per annum.
- **T** is the Time/Tenure in years.`,
      example: `Suppose you deposit **₹50,000** at an annual simple interest rate of **6%** for **3 years**.
- SI = (50,000 × 6 × 3) / 100 = **₹9,000**
- Total maturity amount = 50,000 + 9,000 = **₹59,000**`
    };
  }
  if (id === 'bmi') {
    return {
      formula: `BMI = \\frac{Weight \\; (kg)}{Height^2 \\; (m^2)}`,
      formulaDesc: `Where:
- **Weight** is measured in kilograms.
- **Height** is measured in meters.`,
      example: `Suppose a person weighs **70 kg** and is **1.75 meters** (175 cm) tall.
- BMI = 70 / (1.75 × 1.75) = 70 / 3.0625 = **22.86**
- *Interpretation:* A BMI of 22.86 is within the **Normal** weight range (18.5 – 24.9).`
    };
  }
  return {
    formula: `Result = F(x_1, x_2, \\dots, x_n)`,
    formulaDesc: `Where inputs represent values entered in the form parameters.
The formula uses standardized guidelines for high precision calculations.`,
    example: `Adjusting inputs in the calculator panel automatically re-evaluates the mathematical models and refreshes results on screen instantly.`
  };
}

// ── DYNAMIC FAQs DATA ──────────────────────────────
function getFAQData(id: string, name: string, category: string, desc: string, inputs: { label: string }[]) {
  const inputLabels = inputs.map(i => i.label).join(', ');
  if (id === 'emi') {
    return [
      {
        q: `What is a Loan EMI?`,
        a: `EMI stands for Equated Monthly Installment. It is a fixed amount of money that a borrower pays back to a lender (bank or NBFC) every calendar month until the loan is fully repaid. It consists of both the interest component and the principal component.`
      },
      {
        q: `How does loan prepayment affect my EMI?`,
        a: `Making a principal prepayment reduces the outstanding balance of your loan. You can either choose to keep the tenure same and reduce your monthly EMI, or keep the EMI same and reduce your total loan tenure (which saves more interest over time).`
      },
      {
        q: `Is the EMI calculator secure?`,
        a: `Yes. Calc Labz operates entirely client-side. All inputs and calculations stay on your local device. We never transmit or save any personal data on our servers, ensuring 100% data privacy.`
      }
    ];
  }
  if (id === 'sip') {
    return [
      {
        q: `What is a SIP (Systematic Investment Plan)?`,
        a: `A Systematic Investment Plan (SIP) is a method of investing a fixed sum of money regularly in mutual funds or stocks. Instead of investing a lump sum, a SIP allows you to invest weekly or monthly to benefit from compounding and rupee cost averaging.`
      },
      {
        q: `What is rupee cost averaging in SIP?`,
        a: `Rupee cost averaging means you buy more mutual fund units when market prices (NAV) are low, and fewer units when prices are high. Over the long term, this averages out the cost of your investments and reduces market volatility risks.`
      },
      {
        q: `Is SIP better than Lump Sum investment?`,
        a: `SIP is generally better for salaried individuals as it helps establish financial discipline, does not require timing the market, and provides compound interest benefits. Lump sum is suitable if you have a windfall gain and the market valuations are low.`
      }
    ];
  }
  return [
    {
      q: `What is the ${name}?`,
      a: `The ${name} is a free online tool designed to calculate ${desc.toLowerCase()} instantly, securely, and accurately without any signups or registration.`
    },
    {
      q: `How do I use the ${name}?`,
      a: `Simply fill in the fields (like ${inputLabels}) in the form above. The calculator will automatically perform the calculations and show the main and secondary outputs in real-time.`
    },
    {
      q: `Is my personal data saved when using this calculator?`,
      a: `No. Calc Labz is a client-side progressive web application. All calculations are performed in your browser's runtime. We do not transmit or save any of your inputs on our servers, ensuring 100% data privacy.`
    }
  ];
}

// ── PAGE COMPONENT ────────────────────────────────
export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ calculator: string }>;
}) {
  const { calculator: slug } = await params;

  if (slug.endsWith('-calculators')) {
    const catKey = slug.replace('-calculators', '') as CalculatorCategory;
    const catMeta = CATEGORY_META[catKey];
    if (!catMeta) notFound();

    const calcs = getCalcsByCategory(catKey);

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calclabz.com/' },
        { '@type': 'ListItem', position: 2, name: `${catMeta.name} Calculators`, item: `https://calclabz.com/${slug}` },
      ],
    };

    const itemListJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${catMeta.name} Calculators - Calc Labz`,
      description: catMeta.description,
      url: `https://calclabz.com/${slug}`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: calcs.length,
        itemListElement: calcs.map((id, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://calclabz.com/${getSlugForId(id)}`,
          name: DB[id].name,
          description: DB[id].desc,
        })),
      },
    };

    const categoryFAQs = generateCategoryFAQs(catMeta.name, catKey, calcs.length);
    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: categoryFAQs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };

    return (
      <>
        {/* JSON-LD Category Schemas */}
        <Script
          id="cat-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <Script
          id="cat-itemlist"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
        <Script
          id="cat-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <div className="card">
          {/* Breadcrumb */}
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>{catMeta.name} Calculators</span>
          </nav>

          {/* Category Header */}
          <div className="calc-hdr">
            <div className="calc-title-row" style={{ alignItems: 'center' }}>
              <div className="fc-ico" style={{ background: catMeta.color, width: '48px', height: '48px', marginRight: '16px', flexShrink: 0 }}>
                <Icon name={catMeta.icon} />
              </div>
              <div>
                <h1>{catMeta.name} Calculators</h1>
                <p>{catMeta.description}</p>
              </div>
            </div>
          </div>

          {/* Category-Specific Unique SEO Intro Paragraph */}
          <div className="cat-seo-intro">
            {getCategorySEOIntro(catKey)}
          </div>

          {/* Calculators Grid */}
          <div className="feat-grid">
            {calcs.map((id) => {
              const calc = DB[id];
              return (
                <Link
                  key={id}
                  href={`/${getSlugForId(id)}`}
                  className="feat-card"
                  aria-label={`Open ${calc.name}`}
                >
                  <div className="fc-ico" style={{ background: catMeta.color }}>
                    <Icon name={calc.icon} />
                  </div>
                  <div className="fc-name">{calc.name}</div>
                  <div className="fc-desc">{calc.desc}</div>
                  {calc.badge && <span className="badge">{calc.badge}</span>}
                </Link>
              );
            })}
          </div>

          {/* Category FAQs section */}
          <div className="seo-content-sections" style={{ marginTop: '40px' }}>
            <section className="seo-section">
              <h2>
                <Icon name="fa-circle-question" />
                Frequently Asked Questions — {catMeta.name} Calculators
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                {categoryFAQs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="res-card"
                    style={{ textAlign: 'left', padding: '16px 20px', cursor: 'pointer' }}
                  >
                    <summary style={{ fontWeight: 600, color: 'var(--txt)', outline: 'none' }}>
                      {faq.q}
                    </summary>
                    <p style={{ marginTop: '12px', fontSize: '0.88rem', color: 'var(--txt1)', lineHeight: 1.7 }}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }

  const calcId = findCalcBySlug(slug);
  if (!calcId || !DB[calcId]) notFound();

  const calc = DB[calcId];
  const catMeta = CATEGORY_META[calc.cat];
  const registry = getRegistryEntry(slug);

  // Related calculators (same category, excluding current)
  const relatedCalcs = getCalcsByCategory(calc.cat)
    .filter((id) => id !== calcId)
    .slice(0, 6);

  // LaTeX & FAQs
  const formulaInfo = getFormulaData(calcId);
  const faqs = getFAQData(calcId, calc.name, calc.cat, calc.desc, calc.inputs);

  // SEO content generation
  const seoContent = generateSEOContent(calcId, calc.name, calc.desc, calc.cat, calc.inputs.map(i => i.label));
  const howToSteps = generateHowToSteps(calc.name, calc.inputs);
  const crossLinks = getCrossCategoryLinks(calcId);

  // Category → gradient + icon mapping for thumbnails
  const BLOG_CAT_THEME: Record<string, { gradient: string; icon: string }> = {
    finance:   { gradient: 'linear-gradient(135deg, #1E3A5F, #2563EB)', icon: 'fa-landmark' },
    tax:       { gradient: 'linear-gradient(135deg, #1E3A5F, #3B82F6)', icon: 'fa-file-invoice-dollar' },
    health:    { gradient: 'linear-gradient(135deg, #7F1D1D, #DC2626)', icon: 'fa-heartbeat' },
    education: { gradient: 'linear-gradient(135deg, #1E3A5F, #60A5FA)', icon: 'fa-graduation-cap' },
    lifestyle: { gradient: 'linear-gradient(135deg, #713F12, #D97706)', icon: 'fa-lightbulb' },
    everyday:  { gradient: 'linear-gradient(135deg, #78350F, #F59E0B)', icon: 'fa-calculator' },
    math:      { gradient: 'linear-gradient(135deg, #312E81, #6366F1)', icon: 'fa-square-root-variable' },
    science:   { gradient: 'linear-gradient(135deg, #4C1D95, #7C3AED)', icon: 'fa-flask' },
    engineering: { gradient: 'linear-gradient(135deg, #334155, #64748B)', icon: 'fa-gear' },
  };

  const getCatTheme = (cat: string) => {
    const key = cat.toLowerCase();
    return BLOG_CAT_THEME[key] || { gradient: 'linear-gradient(135deg, #1E293B, #475569)', icon: 'fa-book' };
  };

  // Find recommended blogs for this calculator
  const recommendedBlogs = (() => {
    // 1. First get any blogs directly linked to this calculator
    const directBlogs = BLOG_POSTS.filter((post) => post.calc === calcId);
    
    // 2. Next get blogs from the same category
    const catMapping: Record<string, string[]> = {
      finance: ['Finance', 'Tax'],
      health: ['Health'],
      everyday: ['Everyday', 'Lifestyle'],
      education: ['Education'],
      math: ['Math', 'Everyday'],
      science: ['Science', 'Everyday'],
      engineering: ['Engineering', 'Everyday'],
      construction: ['Everyday', 'Finance'],
      datetime: ['Everyday'],
      unit: ['Everyday'],
    };

    const targetCats = catMapping[calc.cat] || ['Everyday'];
    const categoryBlogs = BLOG_POSTS.filter(
      (post) => post.calc !== calcId && targetCats.some(tc => post.cat.toLowerCase() === tc.toLowerCase())
    );

    // 3. Fallback blogs if we don't have enough
    const fallbacks = BLOG_POSTS.filter(
      (post) => post.calc !== calcId && !targetCats.some(tc => post.cat.toLowerCase() === tc.toLowerCase())
    );

    // Combine them in order: direct first, then category, then fallbacks
    const combined = [...directBlogs, ...categoryBlogs, ...fallbacks];
    
    // Remove duplicates and limit to 3 posts
    const seen = new Set<string>();
    const unique = combined.filter((post) => {
      if (seen.has(post.id)) return false;
      seen.add(post.id);
      return true;
    });

    return unique.slice(0, 3);
  })();

  // JSON-LD structured data — WebApplication (better than SoftwareApplication for interactive tools)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${calc.name} - Calc Labz`,
    description: calc.desc,
    url: `https://calclabz.com/${slug}`,
    applicationCategory: getSchemaCategory(calc.cat),
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    softwareVersion: '2026',
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    featureList: [
      'Instant calculation with real-time updates',
      'No signup or registration required',
      'Works offline as PWA',
      'Data stays on your device — 100% private',
      'Verified formulas updated for 2026',
    ],
    author: {
      '@type': 'Person',
      name: 'Sagar Sahni',
      url: 'https://calclabz.com/author/sagar-sahni',
      jobTitle: 'Founder & Editor',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calc Labz',
      url: 'https://calclabz.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://calclabz.com/calclabz-logo.png',
      },
    },
    datePublished: '2024-01-01',
    dateModified: '2026-05-22',
    screenshot: 'https://calclabz.com/og-image.png',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calclabz.com/' },
      { '@type': 'ListItem', position: 2, name: catMeta.name, item: `https://calclabz.com/${calc.cat}-calculators` },
      { '@type': 'ListItem', position: 3, name: calc.name, item: `https://calclabz.com/${slug}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  // HowTo schema — Google shows step-by-step rich results
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use the ${calc.name}`,
    description: `Step-by-step guide to using the free ${calc.name.toLowerCase()} on Calc Labz.`,
    totalTime: 'PT1M',
    tool: { '@type': 'HowToTool', name: 'Web browser' },
    step: howToSteps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <Script
        id="calc-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="calc-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="calc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="calc-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="card">
        {/* Breadcrumb */}
        <nav className="crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href={`/${calc.cat}-calculators`}>{catMeta.name}</Link>
          <span>›</span>
          <span>{calc.name}</span>
        </nav>

        {/* Calculator Header with Favorite Toggle */}
        <div className="calc-hdr">
          <div className="calc-title-row">
            <div style={{ flex: 1 }}>
              <h1>{calc.name}</h1>
              <p>{calc.desc}</p>
            </div>
            <FavoriteToggle slug={slug} name={calc.name} />
          </div>
        </div>

        {/* Badges */}
        <div className="calc-badges">
          <span className="badge-standard">
            <Icon name="fa-calculator" /> Standard Formula
          </span>
          <span className="badge-updated">
            <Icon name="fa-clock" /> Updated 2026
          </span>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="calc-two-col">
          {/* Left Column: Inputs & Tabs */}
          <div className="calc-col-left">
            <CalculatorTabs hasGuide={!!registry?.blogSlug}>
              {/* Tab 1: Calculator Widget */}
              <div data-tab="calc">
                <CalculatorWidget calcId={calcId} inputs={calc.inputs} tips={calc.tips} />
              </div>

              {/* Tab 2: Formula & Math Explanation */}
              <div data-tab="formula">
                <div className="formula-box">
                  <h3>
                    <Icon name="fa-square-root-variable" />
                    Mathematical Formula
                  </h3>
                  
                  <div className="formula-display">
                    <code>{formulaInfo.formula}</code>
                  </div>

                  <div className="formula-desc-text">
                    {formulaInfo.formulaDesc}
                  </div>

                  <h4 className="formula-example-title">
                    <Icon name="fa-file-signature" />
                    Step-by-Step Worked Example
                  </h4>
                  <div className="formula-example">
                    {formulaInfo.example}
                  </div>
                </div>
              </div>

              {/* Tab 3: Accordion FAQs */}
              <div data-tab="faqs">
                <div className="faqs-wrap">
                  <h3>
                    <Icon name="fa-circle-question" />
                    Frequently Asked Questions
                  </h3>
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="faq-details">
                      <summary>
                        <span>{faq.q}</span>
                        <Icon name="fa-chevron-down" style={{ fontSize: '0.85rem', color: 'var(--txt2)' }} />
                      </summary>
                      <div className="faq-answer">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Tab 4: Guide Link */}
              {registry?.blogSlug && (
                <div data-tab="guide">
                  <div className="guide-tab-content">
                    <Icon name="fa-book-open" style={{ fontSize: '2.5rem', color: 'var(--p)', marginBottom: '16px' }} />
                    <h3>Read Our Comprehensive User Guide</h3>
                    <p>
                      Want to learn more about the math, logic, taxation rules, and optimal strategies for using this calculator? Check out our official editorial guide.
                    </p>
                    <Link href={`/blog/${registry.blogSlug}`} className="btn btn-p" style={{ display: 'inline-flex', padding: '12px 28px', fontSize: '0.95rem' }}>
                      <Icon name="fa-readme" style={{ marginRight: '8px' }} />
                      Read Full Guide
                    </Link>
                  </div>
                </div>
              )}
            </CalculatorTabs>
          </div>

          {/* Right Column: Trust & Info (Sticky) */}
          <div className="calc-col-right">
            {/* Trust Bar */}
            <div style={{
              padding: '20px',
              background: 'var(--surface-glass, var(--bg2))',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border-glass, var(--brd))',
              borderRadius: 'var(--r-lg)',
            }}>
              <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--p)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                Methodology
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span className="trust-item"><Icon name="fa-check-circle" /> Free forever</span>
                <span className="trust-item"><Icon name="fa-lock" /> Data stays on your device</span>
                <span className="trust-item"><Icon name="fa-wifi" /> Works offline (PWA)</span>
                <span className="trust-item"><Icon name="fa-calculator" /> Verified formulas</span>
              </div>
            </div>

            {/* Editorial Trust */}
            <div className="seo-trust">
              <p><strong>Maintained by:</strong> <Link href="/author/sagar-sahni">Sagar Sahni</Link>, Calc Labz &nbsp;|&nbsp; <strong>Review:</strong> formula checks, worked examples, and periodic updates</p>
              <p><strong>Use with care:</strong> {calc.cat === 'health'
                ? 'Health outputs are informational estimates only and do not replace medical advice.'
                : 'Finance and tax outputs are planning estimates only and should be checked against current rules.'
              }</p>
              <p><strong>Need a correction?</strong> <Link href="/contact">Contact us</Link> with the calculator name and the issue you found.</p>
            </div>
          </div>
        </div>

        {/* Recommended Guides & Articles */}
        {recommendedBlogs.length > 0 && (
          <div className="related-wrap" style={{ marginBottom: '32px' }}>
            <h3>
              <Icon name="fa-book-open" />
              Recommended Guides &amp; Articles
            </h3>
            <div className="blog-grid">
              {recommendedBlogs.map((post) => {
                const theme = getCatTheme(post.cat);
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="blog-card"
                    style={{ display: 'flex', flexDirection: 'column' }}
                    aria-label={`Read guide: ${post.title}`}
                  >
                    {/* Thumbnail */}
                    <div
                      className="blog-card-thumbnail"
                      style={{ background: theme.gradient, height: '140px' }}
                    >
                      <div className="blog-card-thumbnail-pattern" />
                      <span className="blog-card-thumbnail-icon">
                        <Icon name={theme.icon} />
                      </span>
                    </div>

                    {/* Body */}
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div className="blog-card-meta">
                        <span className="blog-card-cat">{post.cat}</span>
                        <span>{post.date}</span>
                      </div>
                      <h4 className="blog-card-title" style={{ fontSize: '1.1rem', marginTop: '8px', marginBottom: '8px', lineHeight: '1.4' }}>
                        {post.title}
                      </h4>
                      <p className="blog-card-desc" style={{ fontSize: '0.85rem', color: 'var(--txt2)', margin: '0 0 16px 0' }}>
                        {post.desc}
                      </p>
                      <div className="blog-card-footer" style={{ marginTop: 'auto', paddingTop: '12px' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--txt1)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Icon name="fa-clock" style={{ width: '14px', height: '14px' }} />
                          {post.readTime} read
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          Read Guide
                          <Icon name="fa-chevron-right" style={{ width: '12px', height: '12px' }} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Calculators — Same Category */}
        {relatedCalcs.length > 0 && (
          <div className="related-wrap">
            <h3>
              <Icon name="fa-link" />
              Related {catMeta.name} Calculators
            </h3>
            <div className="related-grid">
              {relatedCalcs.map((id) => (
                <Link
                  key={id}
                  href={`/${getSlugForId(id)}`}
                  className="related-card"
                >
                  <div className="related-card-icon" style={{ background: catMeta.color }}>
                    <Icon name={DB[id].icon} />
                  </div>
                  <div className="related-card-info">
                    <div className="related-card-name">{DB[id].name}</div>
                    <div className="related-card-desc">{DB[id].desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Cross-Category "You May Also Need" — SEO Internal Linking Mesh */}
        {crossLinks.length > 0 && (
          <div className="related-wrap" style={{ marginTop: '8px' }}>
            <h3>
              <Icon name="fa-arrows-split-up-and-left" />
              You May Also Need
            </h3>
            <div className="related-grid">
              {crossLinks.filter(id => DB[id]).slice(0, 6).map((id) => {
                const crossCalc = DB[id];
                const crossCatMeta = CATEGORY_META[crossCalc.cat];
                return (
                  <Link
                    key={id}
                    href={`/${getSlugForId(id)}`}
                    className="related-card"
                  >
                    <div className="related-card-icon" style={{ background: crossCatMeta.color }}>
                      <Icon name={crossCalc.icon} />
                    </div>
                    <div className="related-card-info">
                      <div className="related-card-name">{crossCalc.name}</div>
                      <div className="related-card-desc">{crossCalc.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── SEO Content Sections — Always Visible to Crawlers ── */}
        <div className="seo-content-sections">
          {/* What Is Section */}
          <section className="seo-section" id={`what-is-${calcId}`}>
            <h2>
              <Icon name="fa-circle-info" />
              What is the {calc.name}?
            </h2>
            <p>{seoContent.whatIs}</p>
          </section>

          {/* How To Use Section */}
          <section className="seo-section" id={`how-to-use-${calcId}`}>
            <h2>
              <Icon name="fa-list-check" />
              How to Use the {calc.name}
            </h2>
            <ol className="seo-steps">
              {howToSteps.map((step, idx) => (
                <li key={idx}>
                  <strong>{step.name}:</strong> {step.text}
                </li>
              ))}
            </ol>
          </section>

          {/* Key Features */}
          <section className="seo-section" id={`features-${calcId}`}>
            <h2>
              <Icon name="fa-star" />
              Key Features
            </h2>
            <ul className="seo-features">
              {seoContent.keyFeatures.map((feature, idx) => (
                <li key={idx}>
                  <Icon name="fa-check" style={{ color: 'var(--p)', fontSize: '0.8rem', marginRight: '8px' }} />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Why Use Calc Labz */}
          <section className="seo-section" id={`why-${calcId}`}>
            <h2>
              <Icon name="fa-shield-halved" />
              Why Use Calc Labz {calc.name}?
            </h2>
            <p>{seoContent.whyUse}</p>
          </section>
        </div>
      </div>
    </>
  );
}
