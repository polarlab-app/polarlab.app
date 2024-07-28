'use server';
import { cookies } from 'next/headers';

export default async function updateConsent() {
    cookies().set('consent', 'true', {
        secure: true,
        path: '/',
        maxAge: 2629746000,
        sameSite: true,
    });
    return;
}
