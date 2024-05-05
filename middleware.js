'use server';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function middleware(req) {
    const accessToken = cookies().get('accessToken').value;
    const refreshToken = cookies().get('refreshToken').value;

    console.log(accessToken);
    console.log(refreshToken);

    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const validationResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (validationResponse.status === 200) {
            return NextResponse.next();
        }
    } catch (error) {
        try {
            const refreshResponse = await axios.post(
                'https://discord.com/api/oauth2/token',
                new URLSearchParams({
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            if (refreshResponse.status === 200) {
                cookies().set('accessToken', refreshResponse.data.access_token, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                });
                cookies().set('refreshToken', refreshResponse.data.refresh_token, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                });
                return NextResponse.next();
            }
        } catch (refreshError) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
    matcher: ['/dashboard/:path*', '/dashboard'],
};
