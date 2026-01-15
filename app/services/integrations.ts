/**
 * Integrations service wrapper
 *
 * Centralizes calls to the external integration server used to
 * authorize providers, list connected accounts, finalize OAuth callbacks and
 * disconnect accounts.
 *
 * For local development ensure you have the following env vars:
 * - GOOGLE_INTEGRATION_URL=http://localhost:8003
 * - NEXT_PUBLIC_USER_ID=<dev-user-id>
 * - NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/integrations/gmail/callback
 */
import { safeGet, safePost } from '@/app/helper/axiosHelper';

export type ConnectedAccount = {
  id: string;
  email: string;
  displayName?: string;
  provider?: string;
};

export async function getAuthorizeUrl(
  redirectUri?: string
): Promise<{ url: string }> {
  return safeGet('/authorize', {
    integration: 'google',
    redirectUri,
    userId: process.env.NEXT_PUBLIC_USER_ID,
  });
}

export async function getConnectedAccounts(): Promise<ConnectedAccount[]> {
  return safeGet('/connected-accounts', {
    integration: 'google',
    userId: process.env.NEXT_PUBLIC_USER_ID,
  });
}

export async function finalizeConnection(
  code: string,
  state?: string
): Promise<any> {
  return safePost('/connected-accounts/callback', {
    integration: 'google',
    code,
    state,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    userId: process.env.NEXT_PUBLIC_USER_ID,
  });
}

export async function disconnectAccount(accountId: string): Promise<any> {
  return safePost('/connected-accounts/disconnect', {
    accountId,
    integration: 'google',
    userId: process.env.NEXT_PUBLIC_USER_ID,
  });
}

export default {
  getAuthorizeUrl,
  getConnectedAccounts,
  finalizeConnection,
  disconnectAccount,
};
