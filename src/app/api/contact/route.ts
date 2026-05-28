import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    const w3fResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: 'f0ee81fe-1120-4b75-afe8-eb185729bfda',
        name,
        email,
        message,
        subject: `New Support Request from ${name} via CalcLabz`,
        from_name: 'CalcLabz Contact Form',
      }),
    });

    const result = await w3fResponse.json();

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: result.message || 'Submission failed.' },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('Contact form proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
