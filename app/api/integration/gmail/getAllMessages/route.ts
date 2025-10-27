import { NextRequest, NextResponse } from 'next/server';
import { getAllMessages, GetAllMessagesParams } from '@/app/apihelper/gmail/getAllMessage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.accountId) {
      return NextResponse.json(
        { error: 'accountId is required' },
        { status: 400 }
      );
    }

    // Prepare parameters for the helper function
    const params: GetAllMessagesParams = {
      accountId: body.accountId,
      ...(body.from && { from: body.from }),
      ...(body.after && { after: body.after }),
    };

    // Call the imported helper function (not the MCP API)
    const result = await getAllMessages(params);

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Gmail messages retrieved successfully'
    });
  } catch (error: any) {
    console.error('Get All Messages API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to retrieve Gmail messages',
        details: error.data || null
      },
      { status: error.status || 500 }
    );
  }
}
