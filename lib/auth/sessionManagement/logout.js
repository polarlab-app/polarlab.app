'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function logout() {
    try {
        cookies().delete('accountToken');
        cookies().delete('username');
        cookies().delete('accessToken');
        cookies().delete('refreshToken');

        redirect('/login');
        return true;
    } catch (error) {
        return false;
    }
}
