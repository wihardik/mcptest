import { NextApiRequest, NextApiResponse } from 'next';
import { authorizeOAuth } from '@/app/apihelper/gmail/adminbased/getOauthUrl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { appId, username } = await req.json();

    if (!appId) {
      return res.status(400).json({ error: 'AppId is required' });
    }

    const authUrl = await authorizeOAuth({ appId, username });
    return res.status(200).json(authUrl);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

