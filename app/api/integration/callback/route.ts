import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.INTEGRATION_API_URL || 'http://localhost:3000';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code not provided' },
        { status: 400 }
      );
    }

    // Forward the callback to the backend integration service
    const callbackUrl = `${BACKEND_URL}/dynamic-oauth/callback`;
    const callbackParams = new URLSearchParams();
    callbackParams.append('code', code);
    if (state) callbackParams.append('state', state);

    const response = await fetch(`${callbackUrl}?${callbackParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      return NextResponse.json(
        { error: error.message || 'OAuth callback failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // The response should contain account_id which will be used for subsequent API calls
    return NextResponse.json({
      success: true,
      account_id: data.account_id || data.id,
      message: 'Gmail authorization successful! Use the account_id for API calls.',
      data
    });
  } catch (error: any) {
    console.error('OAuth Callback Error:', error);
    return NextResponse.json(
      { error: error.message || 'OAuth callback processing failed' },
      { status: 500 }
    );
  }
}
