import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import qs from 'qs';

export const dynamic = 'force-dynamic';

export async function POST(req) {
 const { code } = await req.json();
  console.log(code)
 try {
    const response = await axios.post('https://discord.com/api/oauth2/token', qs.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.CALLBACK_URI,
      scope: 'identify guilds'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return NextResponse.json(response.data)
 } catch (error) {
    console.error('Failed to exchange authorization code for access token', error);
    return new NextResponse.error(500, 'Failed to exchange authorization code for access token');
 }
}