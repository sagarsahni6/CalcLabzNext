'use client';

import { useState, useCallback } from 'react';
import Icon from '@/components/ui/Icon';

const RATING_ICONS = [
  { name: 'fa-frown', label: 'Poor' },
  { name: 'fa-meh', label: 'Fair' },
  { name: 'fa-smile', label: 'Okay' },
  { name: 'fa-thumbs-up', label: 'Good' },
  { name: 'fa-star', label: 'Excellent' },
];

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(() => {
    // Store feedback locally for now
    try {
      const existing = JSON.parse(localStorage.getItem('cl_feedback') || '[]');
      existing.push({
        page: window.location.pathname,
        rating,
        feedback,
        ts: Date.now(),
      });
      localStorage.setItem('cl_feedback', JSON.stringify(existing));
    } catch {}
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => setSubmitted(false), 300);
    }, 2000);
  }, [rating, feedback]);

  return (
    <div className="feedback-widget">
      {/* Floating trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Send feedback"
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'var(--p)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', cursor: 'pointer',
          boxShadow: '0 4px 20px var(--p-glow)',
          border: 'none', zIndex: 1000,
          transition: 'all 0.3s var(--ease)',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        <Icon name={isOpen ? 'fa-xmark' : 'fa-comment'} />
      </button>

      {/* Panel */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '84px', right: '24px',
          width: '320px', maxWidth: 'calc(100vw - 48px)',
          background: 'var(--bg1)', borderRadius: '16px',
          border: '1px solid var(--brd)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          padding: '24px', zIndex: 1000,
          animation: 'slideUp 0.3s var(--ease)',
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--accent2)' }}>
                <Icon name="fa-circle-check" />
              </div>
              <div style={{ fontWeight: 700, color: 'var(--txt)', fontSize: '1.1rem' }}>Thank you!</div>
              <div style={{ color: 'var(--txt2)', fontSize: '0.85rem', marginTop: '4px' }}>
                Your feedback helps us improve.
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontWeight: 700, color: 'var(--txt)', fontSize: '1rem', marginBottom: '16px' }}>
                Was this helpful?
              </div>

              {/* Rating */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {RATING_ICONS.map((icon, idx) => {
                  const n = idx + 1;
                  return (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      title={icon.label}
                      style={{
                        width: '44px', height: '44px', borderRadius: '12px',
                        background: rating === n ? 'var(--p)' : 'var(--bg2)',
                        border: `1px solid ${rating === n ? 'var(--p)' : 'var(--brd)'}`,
                        color: rating === n ? '#fff' : 'var(--txt)',
                        fontSize: '1.2rem', cursor: 'pointer',
                        transition: 'all 0.2s var(--ease)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Icon name={icon.name} />
                    </button>
                  );
                })}
              </div>

              {/* Text input */}
              <textarea
                placeholder="Tell us how we can improve..."
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                rows={3}
                style={{
                  width: '100%', background: 'var(--bg2)',
                  border: '1px solid var(--brd)', borderRadius: '10px',
                  padding: '12px', color: 'var(--txt)', fontSize: '0.85rem',
                  resize: 'vertical', outline: 'none',
                  fontFamily: 'inherit',
                }}
              />

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!rating}
                style={{
                  width: '100%', marginTop: '12px', padding: '12px',
                  borderRadius: '10px',
                  background: rating ? 'var(--p)' : 'var(--bg3)',
                  color: rating ? '#fff' : 'var(--txt2)',
                  fontWeight: 600, fontSize: '0.9rem',
                  cursor: rating ? 'pointer' : 'not-allowed',
                  border: 'none',
                  transition: 'all 0.2s var(--ease)',
                }}
              >
                Send Feedback
              </button>

              {/* Bug report */}
              <button
                onClick={() => {
                  setFeedback('[Bug Report] ');
                }}
                style={{
                  marginTop: '8px', padding: '8px',
                  background: 'transparent', border: 'none',
                  color: 'var(--txt2)', fontSize: '0.78rem',
                  cursor: 'pointer', textDecoration: 'underline',
                  width: '100%', textAlign: 'center',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                }}
              >
                <Icon name="fa-bug" style={{ fontSize: '0.78rem' }} /> Report a bug instead
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
