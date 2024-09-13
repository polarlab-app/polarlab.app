'use server';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import xior from 'xior';
import { redirect } from 'next/navigation';

export async function middleware(req) {
    const accountToken = cookies().get('accountToken');
    if (!accountToken) {
        redirect('/login');
    }
}

export const config = {
    matcher: ['/personal', '/personal/:path*', '/dashboard/:path*', '/dashboard'],
};
