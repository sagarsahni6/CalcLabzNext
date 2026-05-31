import { NextResponse } from 'next/server';
import { serverEnv } from '@/lib/env';
import { createLogger } from '@/lib/logger';

const log = createLogger('ContactAPI');

// ── RATE LIMITER ───────────────────────────────────
// In-memory rate limiter. Resets on serverless cold starts,
// which is acceptable — persistent rate limiting requires Redis/KV.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per window per IP

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Clean up stale entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 300_000);

// ── VALIDATION ─────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

interface ContactBody {
  name: string;
  email: string;
  message: string;
  // Honeypot field — bots fill this, humans don't
  website?: string;
}

function validateContactBody(body: unknown): { valid: true; data: ContactBody } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body.' };
  }

  const { name, email, message, website } = body as Record<string, unknown>;

  // Honeypot check — if "website" field is filled, it's a bot
  if (website && typeof website === 'string' && website.trim().length > 0) {
    // Return success to not reveal the honeypot to bots
    return { valid: false, error: '__honeypot__' };
  }

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required.' };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return { valid: false, error: `Name must be under ${MAX_NAME_LENGTH} characters.` };
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return { valid: false, error: 'Email is required.' };
  }
  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { valid: false, error: 'Message is required.' };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Message must be under ${MAX_MESSAGE_LENGTH} characters.` };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    },
  };
}

// ── ROUTE HANDLER ──────────────────────────────────
export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    if (isRateLimited(ip)) {
      log.warn('Rate limited', { ip });
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body.' },
        { status: 400 }
      );
    }

    const validation = validateContactBody(body);
    if (!validation.valid) {
      // Honeypot triggered — silently return success
      if (validation.error === '__honeypot__') {
        log.info('Honeypot triggered', { ip });
        return NextResponse.json({ success: true });
      }
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }

    const { name, email, message } = validation.data;

    // Get API key from environment
    const accessKey = serverEnv.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      log.error('WEB3FORMS_ACCESS_KEY not configured');
      return NextResponse.json(
        { success: false, message: 'Contact form is temporarily unavailable.' },
        { status: 503 }
      );
    }

    // Submit to Web3Forms
    const w3fResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `New Support Request from ${name} via CalcLabz`,
        from_name: 'CalcLabz Contact Form',
      }),
    });

    const result = await w3fResponse.json();

    if (result.success) {
      log.info('Contact form submitted', { email: email.substring(0, 3) + '***' });
      return NextResponse.json({ success: true });
    } else {
      log.warn('Web3Forms submission failed', { error: result.message });
      return NextResponse.json(
        { success: false, message: result.message || 'Submission failed.' },
        { status: 502 }
      );
    }
  } catch (error) {
    log.error('Contact form error', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
