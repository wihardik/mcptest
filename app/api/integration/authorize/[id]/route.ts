import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.INTEGRATION_API_URL || 'http://localhost:3000';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const backendPath = `/dynamic-oauth/authorize/${id}`;
    
    // Add query parameters for GET requests
    const url = new URL(`${BACKEND_URL}${backendPath}`);
    const searchParams = new URLSearchParams(req.nextUrl.searchParams);
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add auth headers from user session
        ...(req.headers.get('authorization') && {
          'Authorization': req.headers.get('authorization')!,
        }),
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      return NextResponse.json(
        { error: error.message || 'Request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
