'use client';

import { useEffect, useRef, memo } from 'react';

interface KaTeXRendererProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

/**
 * Client-side KaTeX renderer. Lazy-loads KaTeX only when this component mounts.
 * Uses renderToString for efficient one-shot rendering, memoized to prevent re-renders.
 */
const KaTeXRenderer = memo(function KaTeXRenderer({ latex, displayMode = false, className }: KaTeXRendererProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const renderedLatex = useRef<string>('');

  useEffect(() => {
    if (!containerRef.current || latex === renderedLatex.current) return;

    let cancelled = false;

    (async () => {
      try {
        const katex = (await import('katex')).default;
        if (cancelled || !containerRef.current) return;

        const html = katex.renderToString(latex, {
          displayMode,
          throwOnError: false,
          strict: false,
          trust: true,
          macros: {
            '\\R': '\\mathbb{R}',
            '\\N': '\\mathbb{N}',
          },
        });

        containerRef.current.innerHTML = html;
        renderedLatex.current = latex;
      } catch (err) {
        console.warn('KaTeX render error:', err);
        if (containerRef.current) {
          containerRef.current.textContent = latex;
        }
      }
    })();

    return () => { cancelled = true; };
  }, [latex, displayMode]);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        display: displayMode ? 'block' : 'inline',
        textAlign: displayMode ? 'center' : undefined,
        overflow: 'auto',
      }}
      aria-label={`Mathematical formula: ${latex}`}
      role="math"
    />
  );
});

export default KaTeXRenderer;
