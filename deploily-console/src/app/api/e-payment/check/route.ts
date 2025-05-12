import { NextResponse } from 'next/server';

export async function GET() {
    const isPaymentEnabled = process.env.NEXT_PUBLIC_PAYMENT_ENABLED === "true" ? true : false;
    return NextResponse.json({ paymentEnabled: isPaymentEnabled });
}
