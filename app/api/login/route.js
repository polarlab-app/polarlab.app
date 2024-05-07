import axios from 'axios';
import qs from 'qs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { code } = await req.json();
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
                sameSite: 'strict',
            });
            cookies().set('refreshToken', response.data.refresh_token, {
                secure: true,
                path: '/',
                sameSite: 'strict',
            });

            return NextResponse.json({ result: 'success' }, { status: '200' });
        } else {
            console.log('Failed to retrieve access token from Discord', response.data);
            return NextResponse.json({ result: 'fail' }, { status: '500' });
        }
    } catch (error) {
        console.error('Error contacting Discord OAuth2 server', error);
        return NextResponse.json({ result: 'fail' }, { status: '500' });
    }
}
