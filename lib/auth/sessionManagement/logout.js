'use server';
import { cookies } from 'next/headers';

export default async function logout() {
    try {
        cookies().delete('accountToken');

        return true;
    } catch (error) {
        return true;
    }
}
