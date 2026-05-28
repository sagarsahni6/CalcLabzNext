'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

export default function FeedbackForm() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [err, setErr] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus('idle');
    setErr('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          message: userMsg,
        }),
      });

      const res = await response.json();

      if (res.success) {
        setStatus('success');
        setUserName('');
        setUserEmail('');
        setUserMsg('');
      } else {
        setStatus('error');
        setErr(res.message || 'Error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus('error');
      setErr('Could not reach the server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErr('');
  };

  if (status === 'success') {
    return (
      <div 
        style={{ 
          background: 'rgba(16, 185, 129, 0.04)', 
          padding: '40px 24px', 
          borderRadius: 'var(--r-md)', 
          border: '1px solid rgba(16, 185, 129, 0.2)',
          textAlign: 'center',
          animation: 'slideUp 0.4s var(--ease)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <div 
          style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'var(--emerald)', 
            color: '#fff', 
            display: 'grid', 
            placeItems: 'center', 
            fontSize: '1.8rem',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
            animation: 'scaleIn 0.5s var(--spring)'
          }}
        >
          <Icon name="fa-check" />
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
          Message Sent Successfully!
        </h2>
        <p style={{ color: 'var(--txt1)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '380px', margin: 0 }}>
          Thank you for reaching out. We have received your message and will get back to you within <strong>24 to 48 hours</strong>.
        </p>
        <button 
          onClick={handleReset} 
          className="btn btn-s" 
          style={{ 
            marginTop: '8px', 
            cursor: 'pointer', 
            justifySelf: 'center',
            width: 'auto',
            padding: '10px 20px',
            fontSize: '0.85rem'
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <section 
      style={{ 
        background: 'var(--bg2)', 
        padding: '28px', 
        borderRadius: 'var(--r-md)', 
        border: '1px solid var(--brd)',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
    >
      <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px' }}>
        Send a Message
      </h2>
      <p style={{ fontSize: '0.82rem', color: 'var(--txt2)', margin: '0 0 20px' }}>
        We generally reply to support queries within a business day.
      </p>
      
      {status === 'error' && (
        <div 
          style={{ 
            background: 'rgba(239, 68, 68, 0.05)', 
            border: '1px solid rgba(239, 68, 68, 0.2)', 
            color: 'var(--rose)', 
            padding: '16px', 
            borderRadius: 'var(--r-sm)', 
            fontSize: '0.85rem', 
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            animation: 'slideUp 0.3s var(--ease)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon name="fa-triangle-exclamation" style={{ fontSize: '1.1rem', flexShrink: 0 }} />
            <span style={{ fontWeight: 600 }}>{err}</span>
          </div>
          <p style={{ margin: 0, color: 'var(--txt2)', fontSize: '0.82rem', lineHeight: 1.5 }}>
            It looks like your connection or browser settings (such as Brave Shields or uBlock Origin) blocked the request. You can send this directly via your email client so you don&apos;t lose your typed message:
          </p>
          <a 
            href={`mailto:support@calclabz.com?subject=${encodeURIComponent('Support Request - CalcLabz')}&body=${encodeURIComponent(`Name: ${userName}\nEmail: ${userEmail}\n\nMessage:\n${userMsg}`)}`}
            className="btn btn-p"
            style={{ 
              alignSelf: 'flex-start',
              width: 'auto',
              padding: '10px 18px',
              fontSize: '0.8rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Icon name="fa-envelope" />
            <span>Send via Email Client</span>
          </a>
        </div>
      )}

      <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div className="inp-grp">
          <label htmlFor="contact-name">Your Name</label>
          <div className="inp-wrap">
            <span className="inp-pfx"><Icon name="fa-user" style={{ fontSize: '0.85rem', color: 'var(--txt2)' }} /></span>
            <input 
              type="text" 
              id="contact-name" 
              name="name"
              placeholder="John Doe" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required 
              disabled={loading}
              style={{ paddingLeft: '4px' }}
            />
          </div>
        </div>

        <div className="inp-grp">
          <label htmlFor="contact-email">Your Email Address</label>
          <div className="inp-wrap">
            <span className="inp-pfx"><Icon name="fa-at" style={{ fontSize: '0.85rem', color: 'var(--txt2)' }} /></span>
            <input 
              type="email" 
              id="contact-email" 
              name="email"
              placeholder="john@example.com" 
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required 
              disabled={loading}
              style={{ paddingLeft: '4px' }}
            />
          </div>
        </div>

        <div className="inp-grp">
          <label htmlFor="contact-message">Message or Feedback</label>
          <div className="inp-wrap" style={{ height: 'auto', flexDirection: 'column', alignItems: 'stretch' }}>
            <textarea 
              id="contact-message" 
              name="message"
              placeholder="Please describe your feedback or suggestions..." 
              rows={5} 
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              required 
              disabled={loading}
              style={{ 
                width: '100%', 
                background: 'none', 
                border: 'none', 
                outline: 'none', 
                padding: '12px 14px', 
                color: 'var(--txt)', 
                resize: 'vertical',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-inter, sans-serif)',
                lineHeight: 1.5
              }}
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-p" 
          disabled={loading}
          style={{ 
            cursor: loading ? 'not-allowed' : 'pointer', 
            justifySelf: 'start', 
            marginTop: '6px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '10px',
            width: 'auto',
            minWidth: '160px',
            opacity: loading ? 0.8 : 1
          }}
        >
          {loading ? (
            <>
              <svg 
                className="animate-spin" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '16px', height: '16px', color: '#fff', animation: 'spin 1s linear infinite' }}
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Icon name="fa-paper-plane" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>

      {/* Embedded Spinner Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />
    </section>
  );
}
