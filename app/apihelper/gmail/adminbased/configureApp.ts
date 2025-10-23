

// ------------------ CONFIGURE N8N TYPE OAUTH ------------------

import { safePost } from "@/app/helper/axiosHelper";

export type ConfigureN8nOAuthParams = {
 
  name: string;
 
  authMethod: "OAuth2"|"ServiceAccount";
  
 appslug: string;
 
  
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
};

export async function configureN8nOAuth(params: ConfigureN8nOAuthParams) {
  const payload = {
    name: params.name,
    
    appslug: "google",
    authMethod: "OAUTH2",
    clientId: params.clientId,
    clientSecret: params.clientSecret,
    redirectUri: params.redirectUri,
    
  };

  const endpoint = `/dynamic-oauth/configuren8ntype/${params.name}`;

  return safePost(endpoint, payload);
}

export default { configureN8nOAuth };
