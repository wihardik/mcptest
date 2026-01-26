import { NextApiRequest, NextApiResponse } from 'next';
import { getAllMessages } from '@/app/apihelper/gmail/userbased/getAllMessage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { accountId, from, after } = await req.json();

    if (!accountId) {
      return res.status(400).json({ error: 'AccountId is required' });
    }

    const messages = await getAllMessages({ accountId, from, after });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

