'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import CalculatorGraphic from '@/components/calculator/CalculatorGraphic';

/** Only the serializable fields from CalculatorDefinition — no functions */
interface CategoryCalcItem {
  name: string;
  desc: string;
  icon: string;
  badge?: string;
}

interface CategoryCalculatorListProps {
  initialCalcs: { id: string; calc: CategoryCalcItem; slug: string }[];
  categoryKey: string;
  categoryColor: string;
}

export default function CategoryCalculatorList({
  initialCalcs,
  categoryKey,
  categoryColor,
}: CategoryCalculatorListProps) {
  const [search, setSearch] = useState('');
  const [selectedSubcat, setSelectedSubcat] = useState('All');
  const [sortBy, setSortBy] = useState<'default' | 'az' | 'za'>('default');

  // Define subcategories for major categories
  const subcategories = useMemo(() => {
    if (categoryKey === 'finance') {
      return ['All', 'Loans', 'Investments', 'Tax & Salary', 'Business'];
    }
    if (categoryKey === 'health') {
      return ['All', 'Body & Weight', 'Diet & Fitness', 'Clinical & Risk'];
    }
    if (categoryKey === 'math') {
      return ['All', 'Basic Math', 'Algebra & Calculus', 'Geometry & Stats'];
    }
    return ['All'];
  }, [categoryKey]);

  // Helper to determine if a calculator fits a subcategory
  const matchesSubcat = useCallback((name: string, desc: string, subcat: string) => {
    if (subcat === 'All') return true;
    const text = (name + ' ' + desc).toLowerCase();

    if (categoryKey === 'finance') {
      if (subcat === 'Loans') {
        return /loan|emi|mortgage|prepayment|eligibility|transfer|interest|lease|compare|refinance|borrow/i.test(text);
      }
      if (subcat === 'Investments') {
        return /sip|investment|wealth|ppf|fd|rd|nps|cagr|swp|lumpsum|mutual|capital|dividend|gold|sgb|bond|portfolio|asset|fund/i.test(text);
      }
      if (subcat === 'Tax & Salary') {
        return /tax|salary|ctc|tds|hra|gratuity|epf|pf|allowance|payroll|encash|presumptive|indexed/i.test(text);
      }
      if (subcat === 'Business') {
        return /business|profit|loss|breakeven|brokerage|invoice|gst|esop|turnover|economics|net worth/i.test(text);
      }
    }

    if (categoryKey === 'health') {
      if (subcat === 'Body & Weight') {
        return /bmi|weight|fat|lean|recomp|bsa|height/i.test(text);
      }
      if (subcat === 'Diet & Fitness') {
        return /calorie|macros|bmr|tdee|water|protein|one rep|pace|vo2|electrolyte|fasting/i.test(text);
      }
      if (subcat === 'Clinical & Risk') {
        return /blood pressure|diabetes|cholesterol|anemia|pregnancy|ovulation|heart rate|lung|alcohol|smoking|vitamins/i.test(text);
      }
    }

    if (categoryKey === 'math') {
      if (subcat === 'Basic Math') {
        return /percentage|ratio|fraction|average|lcm|gcd|roman|prime/i.test(text);
      }
      if (subcat === 'Algebra & Calculus') {
        return /quadratic|logarithm|square root|linear|matrix|determinant|complex/i.test(text);
      }
      if (subcat === 'Geometry & Stats') {
        return /triangle|circle|sphere|statistics|std dev|combinations|probability|scientific/i.test(text);
      }
    }

    return true;
  }, [categoryKey]);

  // Filter and sort calculators
  const processedCalcs = useMemo(() => {
    const result = initialCalcs.filter(({ calc }) => {
      const matchesSearch =
        calc.name.toLowerCase().includes(search.toLowerCase()) ||
        calc.desc.toLowerCase().includes(search.toLowerCase());
      
      const fitsSubcat = matchesSubcat(calc.name, calc.desc, selectedSubcat);

      return matchesSearch && fitsSubcat;
    });

    if (sortBy === 'az') {
      result.sort((a, b) => a.calc.name.localeCompare(b.calc.name));
    } else if (sortBy === 'za') {
      result.sort((a, b) => b.calc.name.localeCompare(a.calc.name));
    }

    return result;
  }, [initialCalcs, search, selectedSubcat, sortBy, matchesSubcat]);

  return (
    <div style={{ marginTop: '24px' }}>
      {/* Search & Sort Panel */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--txt2)', display: 'flex', alignItems: 'center' }}>
            <Icon name="fa-search" />
          </span>
          <input
            type="text"
            placeholder="Search within this category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px 12px 40px',
              borderRadius: 'var(--r-sm)',
              border: '1px solid var(--brd)',
              background: 'var(--bg1)',
              color: 'var(--txt)',
              fontSize: '0.92rem',
              outline: 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--p)';
              e.target.style.boxShadow = '0 0 0 3px var(--p-glow)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--brd)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="sort-select" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--txt1)' }}>
            Sort:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'default' | 'az' | 'za')}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--r-sm)',
              border: '1px solid var(--brd)',
              background: 'var(--bg1)',
              color: 'var(--txt)',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="default">Default / Popular</option>
            <option value="az">Alphabetical (A-Z)</option>
            <option value="za">Alphabetical (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Subcategory Chips */}
      {subcategories.length > 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {subcategories.map((subcat) => {
            const count = initialCalcs.filter(({ calc }) =>
              matchesSubcat(calc.name, calc.desc, subcat)
            ).length;

            const isActive = selectedSubcat === subcat;

            return (
              <button
                key={subcat}
                onClick={() => setSelectedSubcat(subcat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--r-full)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isActive ? `1px solid ${categoryColor}` : '1px solid var(--brd)',
                  background: isActive ? categoryColor : 'var(--bg2)',
                  color: isActive ? '#fff' : 'var(--txt1)',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = categoryColor;
                    e.currentTarget.style.color = 'var(--txt)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--brd)';
                    e.currentTarget.style.color = 'var(--txt1)';
                  }
                }}
              >
                {subcat}
                <span style={{
                  fontSize: '0.72rem',
                  background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg3)',
                  color: isActive ? '#fff' : 'var(--txt2)',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  marginLeft: '2px',
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Calculator Grid */}
      {processedCalcs.length > 0 ? (
        <div className="feat-grid">
          {processedCalcs.map(({ id, calc, slug }) => (
            <Link
              key={id}
              href={`/${slug}`}
              className="feat-card"
              style={{ '--card-accent': categoryColor } as React.CSSProperties}
              aria-label={`Open ${calc.name}`}
            >
              <div className="fc-ico" style={{ background: categoryColor }}>
                <Icon name={calc.icon} />
              </div>
              <div className="fc-name">{calc.name}</div>
              <div className="fc-desc">{calc.desc}</div>
              {calc.badge && <span className="badge">{calc.badge}</span>}
              <CalculatorGraphic calcId={id} category={categoryKey} variant="card" />
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--bg2)', borderRadius: 'var(--r-md)', border: '1px solid var(--brd)' }}>
          <Icon name="fa-magnifying-glass" style={{ fontSize: '2rem', color: 'var(--txt2)', marginBottom: '12px', display: 'inline-block' }} />
          <h3 style={{ color: 'var(--txt)', fontSize: '1.1rem', marginBottom: '4px' }}>No tools match your criteria</h3>
          <p style={{ color: 'var(--txt2)', fontSize: '0.85rem' }}>Try clearing your search query or choosing a different filter.</p>
        </div>
      )}
    </div>
  );
}
