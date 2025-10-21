import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '../../../apihelper/gmail/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, message, accountId, senderName } = await req.json();

    if (!to || !subject || !message || !accountId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data = await sendEmail({ to, subject, message, senderName, accountId });
    return NextResponse.json(data);
  } catch (error) {
    const { message, data, status } = error;
    return NextResponse.json({ message, data }, { status });
  }
}

