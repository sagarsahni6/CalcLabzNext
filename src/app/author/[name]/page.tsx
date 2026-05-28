import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { BLOG_POSTS } from '@/data/blog-db';
import { Mail } from 'lucide-react';

interface PageProps {
  params: Promise<{ name: string }>;
}

export function generateStaticParams() {
  return [
    { name: 'sagar-sahni' }
  ];
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  if (name !== 'sagar-sahni') {
    return {
      title: 'Author Not Found',
    };
  }

  return {
    title: 'Sagar Sahni — Creator & Editor at Calc Labz',
    description: 'Sagar Sahni is the founder and chief editor of Calc Labz. Read his bio, credentials, professional journey, and articles published on Calc Labz.',
    alternates: {
      canonical: `https://calclabz.com/author/${name}`,
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { name } = await params;
  if (name !== 'sagar-sahni') {
    notFound();
  }

  // Filter posts written by Sagar Sahni or default Calc Labz Team posts
  const authorPosts = BLOG_POSTS.filter(p => p.content.meta.author === 'Calc Labz Team').slice(0, 6);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Sagar Sahni — Calc Labz',
    url: 'https://calclabz.com/author/sagar-sahni',
    mainEntity: {
      '@type': 'Person',
      name: 'Sagar Sahni',
      url: 'https://calclabz.com/author/sagar-sahni',
      jobTitle: 'Founder & Chief Editor',
      worksFor: {
        '@type': 'Organization',
        name: 'Calc Labz',
        url: 'https://calclabz.com',
      },
      description: 'Software developer and finance enthusiast. Founder of Calc Labz — India\'s comprehensive free calculator platform.',
      email: 'support@calclabz.com',
      sameAs: [
        'https://github.com/sagarsahni6',
      ],
      knowsAbout: ['Software Engineering', 'Personal Finance', 'Indian Tax Laws', 'Web Development', 'Data Analysis'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Delhi',
        addressCountry: 'IN',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calclabz.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://calclabz.com/about' },
      { '@type': 'ListItem', position: 3, name: 'Sagar Sahni', item: 'https://calclabz.com/author/sagar-sahni' },
    ],
  };

  return (
    <div className="pulse">
      {/* JSON-LD Structured Data */}
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="author-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/about">About</Link>
        <span>&rsaquo;</span>
        <span>Sagar Sahni</span>
      </nav>

      <div style={{ display: 'grid', gap: '30px', marginTop: '12px' }}>
        {/* Author Bio Card */}
        <section className="card" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', alignItems: 'start', padding: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--p2), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '3rem', fontWeight: 'bold', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
              SS
            </div>
            <div style={{ color: 'var(--txt2)', fontSize: '0.85rem', fontWeight: 500 }}>Founder & Editor</div>
          </div>

          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0 0 4px', color: 'var(--txt)', letterSpacing: '-0.02em' }}>Sagar Sahni</h1>
            <p style={{ color: 'var(--p)', fontSize: '0.95rem', fontWeight: 600, margin: '0 0 16px' }}>Delhi, India</p>
            <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.95rem', margin: '0 0 16px' }}>
              Sagar Sahni is a seasoned software developer and finance enthusiast based in Delhi, India. With years of experience building scalable web utilities and analytical tools, Sagar founded Calc Labz to address the lack of transparent, accurate, and completely free calculating platforms.
            </p>
            <p style={{ color: 'var(--txt1)', lineHeight: 1.7, fontSize: '0.95rem', margin: '0' }}>
              Sagar directs the technical architecture and editorial review standards for all tools on Calc Labz, ensuring every math formula and financial tax rule is fully documented and validated against official regulatory structures (like RBI and Income Tax Department rules).
            </p>

            <div style={{ display: 'flex', gap: '24px', marginTop: '20px' }}>
              <a href="mailto:support@calclabz.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--p2)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                <Mail size={16} />
                support@calclabz.com
              </a>
              <span style={{ color: 'var(--brd)' }}>|</span>
              <a href="https://github.com/sagarsahni6" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--p2)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                GitHub Profile
              </a>
            </div>
          </div>
        </section>

        {/* Authored Articles */}
        <section style={{ display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '10px 0 0', color: 'var(--txt)' }}>Latest Articles on Calc Labz</h2>
          <div className="pop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {authorPosts.map((post) => (
              <article key={post.id} className="card hov-scale" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--p2)', background: 'var(--bg3)', padding: '4px 8px', borderRadius: '4px' }}>
                      {post.cat}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--txt2)' }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--txt)', lineHeight: 1.4 }}>
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p style={{ color: 'var(--txt1)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 16px' }}>
                    {post.desc}
                  </p>
                </div>
                <Link href={`/blog/${post.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--p2)', textDecoration: 'none' }}>
                  Read Article &rsaquo;
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
