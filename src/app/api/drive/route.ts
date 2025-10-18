import { NextResponse } from 'next/server';
import { listDriveItems } from '@/lib/graphClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get('itemId');

  try {
    const items = await listDriveItems(itemId || undefined);
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch drive items' }, { status: 500 });
  }
}
