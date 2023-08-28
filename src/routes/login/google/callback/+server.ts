import { AUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';

export const GET = async ({ url }) => {
  const redirectUrl = `${AUTH_URL}/login/google/callback`;
  const code = await url.searchParams.get('code');

  try {
    const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUrl);
    const r = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(r.tokens);
    const user = oAuth2Client.credentials;
    console.log(user);
  } catch (err) {
    console.error('Error logging in with Google', err);
  }
  throw redirect(303, '/');
};
