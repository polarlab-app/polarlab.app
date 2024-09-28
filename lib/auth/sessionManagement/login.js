'use server';

import checkHash from '../validation/checkHash';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';

export default async function login(username, password) {
    try {
        const m = JSON.stringify({ h: 'Failed To Login', d: 'Invalid login details entered', c: 'r', s: false });
        if (!username || !password) {
            return m;
        }
        const query = username.includes('@') ? { email: username } : { username: username };

        const account = await userAccount.findOne(query);

        if (!account) {
            return m;
        }

        const check = await checkHash(password, account.password);

        if (check == false) {
            return m;
        }

        cookies().set('accountToken', account.token, {
            secure: true,
            path: '/',
            maxAge: 1209600,
            sameSite: true,
        });
        cookies().set('username', account.username, {
            secure: true,
            path: '/',
            maxAge: 1209600,
            sameSite: true,
        });

        return JSON.stringify({
            h: 'Login Successful',
            d: 'You have successfully logged in to your account',
            c: 'g',
            s: true,
        });
    } catch (error) {
        return JSON.stringify({ h: 'Failed To Login', d: 'An internal error has occurred', c: 'r', s: false });
    }
}
