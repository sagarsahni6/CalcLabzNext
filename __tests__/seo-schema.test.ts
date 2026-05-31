/* ═══════════════════════════════════════════════════
   Calc Labz — SEO Schema Unit Tests
   ═══════════════════════════════════════════════════ */

import { describe, test, expect } from 'vitest';
import {
  getGlobalSchemas,
  getHomePageSchema,
  getCalculatorSchemas,
  getCategorySchemas,
  getBlogSchema,
} from '@/lib/seo/schema';

describe('getGlobalSchemas', () => {
  test('returns WebSite and Organization schemas', () => {
    const schemas = getGlobalSchemas();
    expect(schemas).toHaveLength(2);
    expect(schemas[0]['@type']).toBe('WebSite');
    expect(schemas[1]['@type']).toBe('Organization');
  });

  test('WebSite schema has required fields', () => {
    const schemas = getGlobalSchemas();
    const website = schemas[0];
    expect(website['@context']).toBe('https://schema.org');
    expect(website.name).toBeDefined();
    expect(website.url).toMatch(/^https?:\/\//);
    expect(website.potentialAction).toBeDefined();
  });

  test('Organization schema has required fields', () => {
    const schemas = getGlobalSchemas();
    const org = schemas[1];
    expect(org.name).toBeDefined();
    expect(org.logo).toMatch(/^https?:\/\//);
    expect(org.founder).toBeDefined();
    expect(org.contactPoint).toBeDefined();
  });
});

describe('getHomePageSchema', () => {
  test('returns SoftwareApplication schema', () => {
    const schema = getHomePageSchema();
    expect(schema['@type']).toBe('SoftwareApplication');
    expect(schema.applicationCategory).toBe('UtilitiesApplication');
    expect(schema.offers.price).toBe('0');
  });
});

describe('getCalculatorSchemas', () => {
  test('returns array with WebApplication, BreadcrumbList, FAQPage, HowTo', () => {
    const schemas = getCalculatorSchemas({
      name: 'EMI Calculator',
      desc: 'Calculate your EMI',
      slug: 'emi-calculator',
      category: 'FinanceApplication',
      faqs: [{ q: 'What is EMI?', a: 'EMI is a fixed payment.' }],
      breadcrumbs: [
        { name: 'Home', url: 'https://calclabz.com' },
        { name: 'EMI Calculator', url: 'https://calclabz.com/emi-calculator' },
      ],
      howToSteps: [
        { name: 'Enter loan amount', text: 'Type your loan amount' },
      ],
    });

    const types = schemas.map((s: Record<string, unknown>) => s['@type']);
    expect(types).toContain('WebApplication');
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('FAQPage');
    expect(types).toContain('HowTo');
  });

  test('omits FAQPage when no FAQs provided', () => {
    const schemas = getCalculatorSchemas({
      name: 'Test',
      desc: 'Test',
      slug: 'test',
      category: 'UtilitiesApplication',
      faqs: [],
      breadcrumbs: [{ name: 'Home', url: 'https://calclabz.com' }],
      howToSteps: [],
    });

    const types = schemas.map((s: Record<string, unknown>) => s['@type']);
    expect(types).not.toContain('FAQPage');
    expect(types).not.toContain('HowTo');
  });
});

describe('getCategorySchemas', () => {
  test('returns CollectionPage and BreadcrumbList', () => {
    const schemas = getCategorySchemas({
      catName: 'Finance',
      catDesc: 'Financial calculators',
      slug: 'finance-calculators',
      calcs: [
        { id: 'emi', name: 'EMI Calculator', desc: 'Calculate EMI', url: 'https://calclabz.com/emi-calculator' },
      ],
    });

    const types = schemas.map((s: Record<string, unknown>) => s['@type']);
    expect(types).toContain('CollectionPage');
    expect(types).toContain('BreadcrumbList');
  });
});

describe('getBlogSchema', () => {
  test('returns BlogPosting with required fields', () => {
    const schema = getBlogSchema({
      title: 'Test Post',
      desc: 'Test description',
      slug: 'test-post',
      isoDate: '2026-05-15',
      authorName: 'Sagar Sahni',
      wordCount: 1500,
    });

    expect(schema['@type']).toBe('BlogPosting');
    expect(schema.headline).toBe('Test Post');
    expect(schema.datePublished).toBe('2026-05-15');
    expect(schema.wordCount).toBe(1500);
    expect(schema.image).toMatch(/^https?:\/\//);
    expect(schema.author['@type']).toBe('Person');
    expect(schema.publisher['@type']).toBe('Organization');
  });

  test('omits wordCount when not provided', () => {
    const schema = getBlogSchema({
      title: 'Test',
      desc: 'Test',
      slug: 'test',
      isoDate: '2026-01-01',
      authorName: 'Author',
    });

    expect(schema.wordCount).toBeUndefined();
  });
});
