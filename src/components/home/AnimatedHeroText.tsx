'use client';

import { useEffect, useState } from 'react';

const phrases = [
  'EMI Calculator',
  'SIP Planner',
  'GST Helper',
  'BMI Tracker',
  'Tax Assistant',
];

export default function AnimatedHeroText() {
  
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const activePhrase = phrases[currentPhraseIdx];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing text
        setDisplayText(activePhrase.slice(0, displayText.length + 1));
        setTypingSpeed(80); // Speed up typing slightly
        
        if (displayText.length === activePhrase.length) {
          // Pause at the end of the phrase
          setTypingSpeed(2500);
          setIsDeleting(true);
        }
      } else {
        // Deleting text
        setDisplayText(activePhrase.slice(0, displayText.length - 1));
        setTypingSpeed(40); // Faster deleting
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(500); // Brief pause before starting next phrase
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentPhraseIdx, typingSpeed]);

  return (
    <div style={{ minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ 
        background: 'linear-gradient(135deg, var(--p) 0%, var(--indigo) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 800,
      }}>
        {displayText}
      </span>
      <span style={{
        color: 'var(--p)',
        fontWeight: 500,
        marginLeft: '2px',
        animation: 'cursorBlink 1s step-end infinite'
      }}>
        |
      </span>
    </div>
  );
}
