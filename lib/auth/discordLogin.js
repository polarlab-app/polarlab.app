'use server';

import axios from 'axios';
import qs from 'qs';
import { cookies } from 'next/headers';

export default async function discordLogin(code) {
  try {
    const response = await axios.post(
      'https://discord.com/api/oauth2/token',
      qs.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.CALLBACK_URI,
        scope: 'identify guilds',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200) {
      cookies().set('accessToken', response.data.access_token, {
        secure: true,
        path: '/',
        sameSite: true,
      });
      cookies().set('refreshToken', response.data.refresh_token, {
        secure: true,
        path: '/',
        sameSite: true,
      });

      return 'success';
    } else {
      console.error(
        'Failed to retrieve access token from Discord',
        response.data
      );
      return 'failed';
    }
  } catch (error) {
    console.error('Error contacting Discord OAuth2 server', error);
    return 'failed';
  }
}
