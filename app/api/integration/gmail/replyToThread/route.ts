import { NextApiRequest, NextApiResponse } from 'next';
import { replyToThread } from '@/app/apihelper/gmail/userbased/replytoEmsil';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { accountId, messageId, message, senderName, replyToSenderOnly, ccList, bccList, attachmentsUi } = await req.json();

    if (!accountId || !messageId || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await replyToThread({ accountId, messageId, message, senderName, replyToSenderOnly, ccList, bccList, attachmentsUi });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

