'use server';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import xior from 'xior';

export async function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/personal')) {
    } else if (req.nextUrl.pathname.startsWith('/dashboard')) {
        const accessToken = cookies().get('accessToken');
        const refreshToken = cookies().get('refreshToken');

        if (!accessToken) {
            return NextResponse.redirect(new URL('/oauth2/login/discord', req.url));
        }

        try {
            const validationResponse = await xior.get('https://discord.com/api/users/@me', {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`,
                },
            });

            if (validationResponse.status == 200) {
                return NextResponse.next();
            }
        } catch (error) {
            console.error(error);
            try {
                const refreshResponse = await xior.post(
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
                return NextResponse.redirect(new URL('/oauth2/login/discord', req.url));
            }
        }

        return NextResponse.redirect(new URL('/oauth2/login/discord', req.url));
    }
}

async function personalMiddleware(req) {
    return NextResponse.next();
}

export const config = {
    matcher: ['/personal', '/personal/:path*', '/dashboard/:path*', '/dashboard'],
};
