import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import qs from 'qs';

export const dynamic = 'force-dynamic';

export async function POST(req) {
    const { code } = await req.json();
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

        const userData = await axios
            .get('https://discord.com/api/users/@me', {
                headers: {
                    Authorization: `Bearer ${response.data.access_token}`,
                },
            })
            .catch((error) => {
                console.log(error);
            });

        return await NextResponse.json({ response: response.data, userData: userData.data });
    } catch (error) {
        console.error('Failed to exchange authorization code for access token', error);
        return new NextResponse.error(500, 'Failed to exchange authorization code for access token');
    }
}
