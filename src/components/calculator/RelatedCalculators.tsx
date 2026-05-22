'use client';

import Link from 'next/link';
import { DB } from '@/data/calculator-db';
import { getSlugForId } from '@/data/calculator-db';
import Icon from '@/components/ui/Icon';

// Mapping of related calculators
const RELATED_MAP: Record<string, string[]> = {
  emi: ['sip', 'mortgage', 'carloan', 'loaneligibility', 'prepayment'],
  sip: ['emi', 'lumpsum', 'stepupsip', 'goalsip', 'mutualfundreturns'],
  bmi: ['tdee', 'idealweight', 'bodyfat', 'caloriedeficit', 'macros'],
  tdee: ['bmr', 'bmi', 'macros', 'caloriedeficit', 'calories'],
  bmr: ['tdee', 'macros', 'caloriedeficit', 'bmi'],
  incometax: ['taxregime', 'hra', 'taxsaving', 'advancetax', 'inhandsalary'],
  gst: ['pregst', 'profitloss', 'gstinvoice'],
  fd: ['rd', 'ppf', 'compoundinterest', 'simpleinterest', 'scss'],
  ppf: ['fd', 'nps', 'epf', 'ssy', 'elssreturns'],
  bodyfat: ['bmi', 'idealweight', 'leanbodymass', 'bodyrecomp', 'waisthip'],
  macros: ['tdee', 'proteinintake', 'caloriedeficit', 'calories'],
  caloriedeficit: ['tdee', 'bmr', 'macros', 'bodyrecomp', 'bmi'],
  mortgage: ['emi', 'prepayment', 'loanaffordability', 'balancetransfer', 'rentvsbuy'],
  bloodpressure: ['heartrate', 'cholesterolratio', 'diabetesrisk', 'bmi', 'waisthip'],
  nps: ['ppf', 'epf', 'retirementcorpus', 'sip', 'fireCalc'],
  bodyrecomp: ['bodyfat', 'tdee', 'proteinintake', 'macros', 'onerepmax'],
};

interface RelatedCalculatorsProps {
  calcId: string;
}

export default function RelatedCalculators({ calcId }: RelatedCalculatorsProps) {
  const relatedIds = RELATED_MAP[calcId];
  if (!relatedIds || relatedIds.length === 0) return null;

  const related = relatedIds
    .filter(id => DB[id])
    .slice(0, 4)
    .map(id => ({ id, ...DB[id] }));

  if (related.length === 0) return null;

  return (
    <div className="related-wrap" style={{ marginTop: '32px' }}>
      <h3>
        <Icon name="fa-link" style={{ color: 'var(--p)' }} /> You May Also Need
      </h3>
      <div className="related-grid">
        {related.map((calc) => (
          <Link
            href={`/${getSlugForId(calc.id)}`}
            key={calc.id}
            className="related-card"
          >
            <div
              className="related-card-icon"
              style={{ background: 'var(--gradient-accent)' }}
            >
              <Icon name={calc.icon} />
            </div>
            <div className="related-card-info">
              <div className="related-card-name">
                {calc.name.replace(' Calculator', '').replace(' Planner', '')}
              </div>
              <div className="related-card-desc">
                {calc.desc.length > 50 ? calc.desc.slice(0, 50) + '…' : calc.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
