import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get('imagePath');

    if (!imagePath) {
        return NextResponse.json({ error: 'Missing imagePath' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
        return NextResponse.json({ error: 'Base URL not configured' }, { status: 500 });
    }

    const imageUrl = `${baseUrl}/static/uploads/${imagePath}`;

    return NextResponse.json({ url: imageUrl });
}
