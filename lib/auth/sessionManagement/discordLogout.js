'use server';
import { cookies } from 'next/headers';

export default async function discordLogout() {
    try {
        cookies().delete('accessToken');
        cookies().delete('refreshToken');

        return true;
    } catch (error) {
        return false;
    }
}
