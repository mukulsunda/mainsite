import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  return NextResponse.json({ error: 'PhonePe integration is currently disabled' }, { status: 503 });
  /*
  try {
    const { amount, orderId, customerId, mobileNumber } = await req.json();
// ... existing code ...
    } else {
      return NextResponse.json({ error: data.message || 'Payment initiation failed' }, { status: 400 });
    }

  } catch (error) {
    console.error('PhonePe Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  */
}
