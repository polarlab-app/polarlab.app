'use server';
import { cookies } from 'next/headers';

export default async function logout() {
    try {
        cookies().delete('accountToken');
        cookies().delete('username');

        return JSON.stringify({
            h: 'Logout Successful',
            d: 'You have successfully logged out of your account',
            c: 'g',
            s: true,
        });
    } catch (error) {
        return JSON.stringify({
            h: 'Logout Failed',
            d: 'An internal error has occurred',
            c: 'g',
            s: false,
        });
    }
}
