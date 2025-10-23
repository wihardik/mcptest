

// ------------------ AUTHORIZE OAUTH APP ------------------

import { safeGet } from "@/app/helper/axiosHelper";

export type AuthorizeOAuthParams = {
  appId: string;
  username?: string; // optional, because you may or may not pass it
};

export async function authorizeOAuth(params: AuthorizeOAuthParams) {
  const endpoint = `/dynamic-oauth/authorize/${params.appId}`;
  
  // add query param only if username exists
  const query = params.username ? `?username=${params.username}` : "";

  return safeGet(`${endpoint}${query}`);
}

export default { authorizeOAuth };
