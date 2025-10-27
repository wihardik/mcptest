import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.INTEGRATION_API_URL || 'http://localhost:3000';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'hardik'; // Default user from integration setup
    
    // Use the app_id from Integration Agent setup
    const app_id = process.env.GMAIL_APP_ID || '68ff6086cc0a8f747a6ea82d';
    
    if (!app_id) {
      return NextResponse.json(
        { error: 'Gmail app_id not configured. Please check GMAIL_APP_ID environment variable.' },
        { status: 500 }
      );
    }

    // Create authorization URL using the app_id
    const authUrl = `${BACKEND_URL}/dynamic-oauth/authorize/${app_id}?username=${userId}`;
    
    return NextResponse.json({
      authUrl,
      app_id,
      userId,
      message: 'Use this URL to authorize Gmail access. After authorization, you will receive an account_id for API calls.'
    });
  } catch (error: any) {
    console.error('Auth URL Generation Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate auth URL' },
      { status: 500 }
    );
  }
}
