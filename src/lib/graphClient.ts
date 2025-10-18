import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import 'isomorphic-fetch';

const credential = new ClientSecretCredential(
  process.env.AZURE_TENANT_ID!,
  process.env.NEXT_PUBLIC_AZURE_CLIENT_ID!,
  process.env.AZURE_CLIENT_SECRET!
);

async function getAccessToken() {
  const tokenResponse = await credential.getToken('https://graph.microsoft.com/.default');
  return tokenResponse.token;
}

export async function getGraphClient() {
  const accessToken = await getAccessToken();
  
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
}

export async function listDriveItems(itemId?: string) {
  const client = await getGraphClient();
  const userId = process.env.NEXT_PUBLIC_GRAPH_USER_ID;
  
  try {
    if (itemId) {
      // List children of specific folder
      const response = await client
        .api(`/users/${userId}/drive/items/${itemId}/children`)
        .get();
      return response.value;
    } else {
      // List root items
      const response = await client
        .api(`/users/${userId}/drive/root/children`)
        .get();
      return response.value;
    }
  } catch (error) {
    console.error('Error fetching drive items:', error);
    throw error;
  }
}
