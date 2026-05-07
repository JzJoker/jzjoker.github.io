#!/usr/bin/env node
/**
 * One-time script to generate a Google OAuth refresh token.
 *
 * Usage:
 *   1. Fill in CLIENT_ID and CLIENT_SECRET below (from Google Cloud Console)
 *   2. node app/scripts/get-refresh-token.mjs
 *   3. Open the printed URL in your browser and authorize access
 *   4. Paste the auth code when prompted
 *   5. Copy the printed refresh_token into your Vercel env vars
 */

import { createInterface } from 'readline';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'PASTE_YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'PASTE_YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'; // out-of-band for CLI
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const authUrl =
  `https://accounts.google.com/o/oauth2/v2/auth?` +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline',
    prompt: 'consent',
  });

console.log('\n1. Open this URL in your browser:\n');
console.log(authUrl);
console.log('\n2. Authorize access, then paste the code below.\n');

const rl = createInterface({ input: process.stdin, output: process.stdout });
rl.question('Auth code: ', async (code) => {
  rl.close();

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code: code.trim(),
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  });

  const data = await res.json();

  if (data.refresh_token) {
    console.log('\n✓ Success! Add this to Vercel environment variables:\n');
    console.log(`GOOGLE_REFRESH_TOKEN=${data.refresh_token}\n`);
  } else {
    console.error('\n✗ Failed:', JSON.stringify(data, null, 2));
  }
});
