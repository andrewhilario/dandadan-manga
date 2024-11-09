import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imgUrl = searchParams.get('imgUrl');
  const referer = searchParams.get('referer');

  if (!imgUrl || !referer) {
    return NextResponse.json({ error: 'Missing imgUrl or referer' }, { status: 400 });
  }

  try {
    const response = await fetch(imgUrl, {
      headers: {
        'Referer': referer,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status });
    }

    const imageBuffer = await response.arrayBuffer();
    return new NextResponse(Buffer.from(imageBuffer), {
      headers: {
        'Content-Type': response.headers.get('content-type') || 'image/jpeg',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: 'Error fetching image' }, { status: 500 });
  }
} 