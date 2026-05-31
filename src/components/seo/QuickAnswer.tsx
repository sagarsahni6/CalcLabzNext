/* ═══════════════════════════════════════════════════
   Calc Labz — Quick Answer Block Component
   Targets AI Overviews + Featured Snippets.
   Uses itemscope/itemprop for schema.org Answer markup.
   Server component — renders in initial SSR HTML.
   ═══════════════════════════════════════════════════ */

import Icon from '@/components/ui/Icon';

interface QuickAnswerProps {
  question: string;
  answer: string;
  calculatorName: string;
}

/**
 * Featured snippet targeting block.
 * Uses schema.org Answer itemscope for AI search optimisation.
 * Positioned above the calculator widget for maximum snippet eligibility.
 */
export default function QuickAnswer({ question, answer, calculatorName }: QuickAnswerProps) {
  return (
    <section
      className="quick-answer"
      itemScope
      itemType="https://schema.org/Answer"
      aria-label={`Quick answer for ${calculatorName}`}
    >
      <h2>
        <Icon name="fa-bolt" />
        {question}
      </h2>
      <p itemProp="text" dangerouslySetInnerHTML={{ __html: answer }} />
    </section>
  );
}
