import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { ClientSecretCredential } from "@azure/identity";

const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;

if (!tenantId || !clientId || !clientSecret) {
  throw new Error('Missing required Azure AD credentials in environment variables');
}

const credential = new ClientSecretCredential(
  tenantId,
  clientId,
  clientSecret
);

const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ["https://graph.microsoft.com/.default"],
});

export const graphClient = Client.initWithMiddleware({
  authProvider,
});