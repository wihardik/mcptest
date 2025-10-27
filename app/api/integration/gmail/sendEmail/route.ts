import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, SendEmailParams } from '@/app/apihelper/gmail/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    const requiredFields = ['to', 'subject', 'message', 'accountId'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Prepare parameters for the helper function
    const params: SendEmailParams = {
      to: body.to,
      subject: body.subject,
      message: body.message,
      accountId: body.accountId,
      ...(body.senderName && { senderName: body.senderName }),
    };

    // Call the imported helper function (not the MCP API)
    const result = await sendEmail(params);

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Email sent successfully via Gmail'
    });
  } catch (error: any) {
    console.error('Send Email API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send email via Gmail',
        details: error.data || null
      },
      { status: error.status || 500 }
    );
  }
}
