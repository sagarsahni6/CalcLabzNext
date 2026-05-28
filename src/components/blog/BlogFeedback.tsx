'use client';

import { useState, useEffect } from 'react';

interface BlogFeedbackProps {
  slug: string;
}

export default function BlogFeedback({ slug }: BlogFeedbackProps) {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  // Load stored feedback on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`blog-feedback-${slug}`);
      if (stored === 'yes' || stored === 'no') {
        setFeedback(stored);
      }
    } catch {
      // localStorage might not be available
    }
  }, [slug]);

  const handleFeedback = (value: 'yes' | 'no') => {
    setFeedback(value);
    try {
      localStorage.setItem(`blog-feedback-${slug}`, value);
    } catch {
      // Silently fail if localStorage is not available
    }
  };

  return (
    <div className="blog-feedback">
      <div className="blog-feedback-title">Was this article helpful?</div>
      <div className="blog-feedback-buttons">
        <button
          className={`blog-feedback-btn ${feedback === 'yes' ? 'selected-yes' : ''}`}
          onClick={() => handleFeedback('yes')}
          aria-label="Yes, this was helpful"
        >
          <span style={{ fontSize: '1.2rem' }}>👍</span>
          Yes
        </button>
        <button
          className={`blog-feedback-btn ${feedback === 'no' ? 'selected-no' : ''}`}
          onClick={() => handleFeedback('no')}
          aria-label="No, this was not helpful"
        >
          <span style={{ fontSize: '1.2rem' }}>👎</span>
          No
        </button>
      </div>
      {feedback && (
        <div className="blog-feedback-thanks">
          {feedback === 'yes'
            ? '🎉 Thank you! Glad this guide was useful.'
            : '📝 Thanks for the feedback — we\'ll work on improving this article.'}
        </div>
      )}
    </div>
  );
}
