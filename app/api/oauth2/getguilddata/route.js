import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import qs from 'qs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(req) {
    const cookieStore = cookies();
    const accessCookie = await cookieStore.get('accessToken');
    const accessToken = accessCookie.value;

    const request = await axios
        .get('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .catch((error) => {
            console.log(error);
        });
}
