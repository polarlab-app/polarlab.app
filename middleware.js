'use server';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import xior from 'xior';

export async function middleware(req) {
    const accountToken = cookies().get('accountToken');
    if (!accountToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/personal', '/personal/:path*', '/dashboard/:path*', '/dashboard'],
};
