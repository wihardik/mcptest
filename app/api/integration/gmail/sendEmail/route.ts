import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '@/app/apihelper/gmail/userbased/sendEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { accountId, to, subject, message, senderName } = await req.json();

    if (!accountId || !to || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await sendEmail({ accountId, to, subject, message, senderName });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

