'use server';
import { cookies } from 'next/headers';

export default async function logout() {
    try {
        cookies().delete('accountToken');
        cookies().delete('username');

        return true;
    } catch (error) {
        return false;
    }
}
