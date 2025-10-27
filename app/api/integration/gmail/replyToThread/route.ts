import { NextRequest, NextResponse } from 'next/server';
import { replyToThread, ReplyToThreadParams } from '@/app/apihelper/gmail/replytoEmsil';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    const requiredFields = ['messageId', 'message', 'accountId'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Prepare parameters for the helper function
    const params: ReplyToThreadParams = {
      messageId: body.messageId,
      message: body.message,
      accountId: body.accountId,
      ...(body.senderName && { senderName: body.senderName }),
      ...(body.replyToSenderOnly !== undefined && { replyToSenderOnly: body.replyToSenderOnly }),
      ...(body.ccList && { ccList: body.ccList }),
      ...(body.bccList && { bccList: body.bccList }),
      ...(body.attachmentsUi && { attachmentsUi: body.attachmentsUi }),
    };

    // Call the imported helper function (not the MCP API)
    const result = await replyToThread(params);

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Reply sent successfully via Gmail'
    });
  } catch (error: any) {
    console.error('Reply To Thread API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to reply to Gmail thread',
        details: error.data || null
      },
      { status: error.status || 500 }
    );
  }
}
