import { NextRequest, NextResponse } from 'next/server';
import { getAllMessages } from '../../../apihelper/gmail/getAllMessage';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accountId = searchParams.get('accountId');
  const from = searchParams.get('from');
  const after = searchParams.get('after');

  if (!accountId) {
    return NextResponse.json({ error: 'accountId is required' }, { status: 400 });
  }

  try {
    const data = await getAllMessages({ accountId, from, after });
    return NextResponse.json(data);
  } catch (error) {
    const { message, data, status } = error;
    return NextResponse.json({ message, data }, { status });
  }
}

