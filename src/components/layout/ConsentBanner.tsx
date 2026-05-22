'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

const CONSENT_KEY = 'calclabz_consent';
const GA_ID = 'G-KBNL7BG63K';
const ADSENSE_ID = 'ca-pub-3010631666598300';

// Type-safe window extensions
interface CalcLabzWindow extends Window {
  loadGA?: () => void;
  loadAdSense?: () => void;
  CalcLabzConsent?: { get: () => string | null; revoke: () => void; showBanner: () => void };
  sanitizeHTML?: (html: string) => string;
  safeStore?: (key: string, value: string) => void;
  showToast?: (msg: string) => void;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  _toastTimeout?: ReturnType<typeof setTimeout>;
}

function getWin(): CalcLabzWindow {
  return window as CalcLabzWindow;
}

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let gaLoaded = false;
    let adsLoaded = false;
    const w = getWin();

    function getConsent(): string | null {
      try {
        return localStorage.getItem(CONSENT_KEY);
      } catch {
        return null;
      }
    }

    // Expose GA/AdSense loaders for direct consumption
    w.loadGA = function() {
      if (gaLoaded) return;
      gaLoaded = true;
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      s.setAttribute('data-consent-script', 'ga');
      document.head.appendChild(s);

      w.dataLayer = w.dataLayer || [];
      w.gtag = function (...args: unknown[]) {
        w.dataLayer!.push(args);
      };
      w.gtag('js', new Date());
      w.gtag('config', GA_ID);
    };

    w.loadAdSense = function() {
      if (adsLoaded) return;
      adsLoaded = true;
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
      s.crossOrigin = 'anonymous';
      s.setAttribute('data-consent-script', 'adsense');
      document.head.appendChild(s);
    };

    // Remove injected tracker scripts, clear GA cookies, and wipe dataLayer.
    // Called when consent is revoked or rejected after a prior acceptance.
    function teardownTrackers() {
      // Remove all consent-injected script elements
      document.querySelectorAll('script[data-consent-script]').forEach((el) => el.remove());

      // Revoke GA consent before wiping (graceful shutdown)
      if (w.gtag) {
        try {
          w.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied' });
        } catch { /* best-effort */ }
      }

      // Clear GA/AdSense cookies
      const cookiesToClear = document.cookie.split(';').map(c => c.trim().split('=')[0])
        .filter(name => /^_ga|^_gid|^_gat|^__gads|^__gpi/.test(name));
      const domains = [window.location.hostname, '.' + window.location.hostname];
      for (const name of cookiesToClear) {
        for (const domain of domains) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`;
        }
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }

      // Wipe runtime state
      w.dataLayer = [];
      delete w.gtag;
      gaLoaded = false;
      adsLoaded = false;
    }

    function showBanner() {
      if (getConsent()) return;
      setShow(true);
    }

    function revokeConsent() {
      // Tear down trackers if they were loaded (consent was previously accepted)
      const wasAccepted = getConsent() === 'accepted';
      try {
        localStorage.removeItem(CONSENT_KEY);
      } catch { /* no-op */ }
      if (wasAccepted) {
        teardownTrackers();
      }
      gaLoaded = false;
      adsLoaded = false;
      setShow(true);
    }

    function sanitizeHTML(html: string): string {
      if (typeof html !== 'string') return '';
      if (typeof DOMParser === 'undefined') return html;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const dangerous = doc.querySelectorAll('script,style,iframe,object,embed,base,form,input,button,link');
      dangerous.forEach((el) => el.remove());
      const allElements = doc.querySelectorAll('*');
      allElements.forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
          if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
          if (
            (attr.name === 'href' || attr.name === 'src' || attr.name === 'action') &&
            /^\s*javascript:/i.test(attr.value)
          ) {
            el.removeAttribute(attr.name);
          }
        });
      });
      return doc.body.innerHTML;
    }

    function safeStore(key: string, value: string) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn('Storage error for ' + key + ' ' + e);
      }
    }

    function showToast(msg: string) {
      const toast = document.getElementById('toast');
      const msgEl = document.getElementById('toastMsg');
      if (toast && msgEl) {
        msgEl.textContent = msg;
        toast.className = 'show';
        clearTimeout(w._toastTimeout);
        w._toastTimeout = setTimeout(() => {
          toast.className = '';
        }, 3000);
      }
    }

    // Expose window API
    w.CalcLabzConsent = {
      get: getConsent,
      revoke: revokeConsent,
      showBanner: showBanner,
    };
    w.sanitizeHTML = sanitizeHTML;
    w.safeStore = safeStore;
    w.showToast = showToast;

    // Auto-init: load scripts if consent was previously given
    const consent = getConsent();
    if (consent === 'accepted') {
      w.loadGA();
      w.loadAdSense();
    } else if (!consent) {
      setShow(true);
    }

    return () => {
      delete w.CalcLabzConsent;
      delete w.sanitizeHTML;
      delete w.safeStore;
      delete w.showToast;
      delete w.loadGA;
      delete w.loadAdSense;
    };
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {
      // Ignore
    }
    // Load tracking scripts
    const w = getWin();
    if (w.loadGA) w.loadGA();
    if (w.loadAdSense) w.loadAdSense();
    setShow(false);
  };

  const handleReject = () => {
    // If user previously accepted, tear down the loaded trackers
    const wasAccepted = (() => {
      try { return localStorage.getItem(CONSENT_KEY) === 'accepted'; } catch { return false; }
    })();
    try {
      localStorage.setItem(CONSENT_KEY, 'rejected');
    } catch {
      // Ignore
    }
    if (wasAccepted) {
      // Access teardown via the exposed window API
      const w = getWin();
      // Remove tracker scripts from DOM
      document.querySelectorAll('script[data-consent-script]').forEach((el) => el.remove());
      if (w.gtag) {
        try {
          w.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied' });
        } catch { /* best-effort */ }
      }
      w.dataLayer = [];
      delete w.gtag;
    }
    setShow(false);
  };

  return (
    <>
      {show && (
        <div id="consent-banner" className="consent-show" role="dialog" aria-label="Cookie consent">
          <div className="consent-inner">
            <p className="consent-text">
              <Icon name="fa-cookie-bite" aria-hidden="true" style={{ marginRight: '6px' }} />{' '}
              We use <strong>Google Analytics</strong> and <strong>Google AdSense</strong> to improve our service and keep it free.
              No personal data is collected by Calc Labz itself.{' '}
              <Link href="/privacy" className="consent-link">Privacy Policy</Link>
            </p>
            <div className="consent-actions">
              <button className="consent-btn consent-accept" data-consent="accept" onClick={handleAccept}>
                Accept
              </button>
              <button className="consent-btn consent-reject" data-consent="reject" onClick={handleReject}>
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
      <div id="toast" role="status" aria-live="assertive" aria-atomic="true">
        <Icon name="fa-check-circle" style={{ color: 'var(--acc2)', marginRight: '6px' }} aria-hidden="true" />
        <span id="toastMsg"></span>
      </div>
    </>
  );
}
