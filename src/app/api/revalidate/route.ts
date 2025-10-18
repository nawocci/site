import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // Validate secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Always revalidate blog list page
    revalidatePath('/blog');
    
    // If it's a post update/create/delete, revalidate that specific post too
    if (body._type === 'post' && body.slug?.current) {
      revalidatePath(`/blog/${body.slug.current}`);
    }
    
    console.log('Revalidated:', {
      blogList: true,
      post: body.slug?.current || null,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      paths: ['/blog', body.slug?.current ? `/blog/${body.slug.current}` : null].filter(Boolean)
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
