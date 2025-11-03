import { safeGet, safePost } from '@/app/helper/axiosHelper';

export type ConnectedAccount = {
  id: string;
  email: string;
  name?: string;
  provider?: string;
  connectedAt?: string;
  needsReauth?: boolean;
};

export async function listAccounts(): Promise<ConnectedAccount[]> {
  const data = await safeGet('/integrations/google/accounts');
  // expected shape: { accounts: ConnectedAccount[] }
  return data?.accounts ?? [];
}

export async function getAuthUrl(returnTo?: string): Promise<{ authUrl: string }> {
  const payload = { returnTo };
  const data = await safePost('/integrations/google/authorize', payload);
  return { authUrl: data?.authUrl ?? '' };
}

export async function revokeAccount(accountId: string) {
  const data = await safePost('/integrations/google/revoke', { accountId });
  return data;
}

export default { listAccounts, getAuthUrl, revokeAccount };
