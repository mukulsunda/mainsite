import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  return NextResponse.json({ status: 'FAILURE', message: 'PhonePe integration is currently disabled' });
  /*
  try {
    const { merchantTransactionId } = await req.json();
// ... existing code ...
    } else {
      return NextResponse.json({ status: 'FAILURE', message: data.message || 'Payment failed' });
    }

  } catch (error) {
    console.error('PhonePe Status Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  */
}
