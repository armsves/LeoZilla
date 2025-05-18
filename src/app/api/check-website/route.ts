import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return new NextResponse(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RateZilla/1.0)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
        signal: controller.signal,
        // Don't follow redirects to avoid false positives
        redirect: 'manual',
      });

      clearTimeout(timeoutId);

      // Consider 2xx and 3xx status codes as successful
      const isSuccessful = response.status >= 200 && response.status < 400;
      
      return new NextResponse(JSON.stringify({ 
        status: response.status,
        ok: isSuccessful 
      }), {
        status: isSuccessful ? 200 : 404,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      // If it's an abort error, the request timed out
      if (fetchError.name === 'AbortError') {
        return new NextResponse(JSON.stringify({ 
          error: 'Request timed out',
          ok: false 
        }), {
          status: 408,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Error checking website:', error);
    return new NextResponse(JSON.stringify({ 
      error: 'Failed to check website',
      ok: false 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 