'use server';
import { cookies } from 'next/headers';

export default async function logout() {
    try {
        cookies().delete('accountToken');
        cookies().delete('username');
        cookies().delete('accessToken');
        cookies().delete('refreshToken');

        return true;
    } catch (error) {
        return true;
    }
}
