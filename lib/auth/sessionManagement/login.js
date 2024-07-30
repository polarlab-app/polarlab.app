'use server';

import mongoose from 'mongoose';
import checkHash from '../validation/checkHash';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';

export default async function login(username, password) {
    await mongoose.connect(process.env.MONGO_URI || '', {
        authSource: 'admin',
    });
    const query = username.includes('@') ? { email: username } : { username: username };

    const account = await userAccount.findOne(query);

    if (!account) {
        return `The provided ${isEmail ? 'email' : 'username'} does not exist`;
    }

    const check = await checkHash(password, account.password);

    if (check == false) {
        return 'The provided password is incorrect';
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

    await mongoose.connection.close();
    return true;
}
