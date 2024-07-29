'use server';

import mongoose from 'mongoose';
import checkHash from '../validation/checkHash';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';

export default async function login(username, password) {
    await mongoose.connect(process.env.MONGO_URI || '', {
        authSource: 'admin',
    });
    const account = await userAccount.findOne({ username: username });
    if (!account) {
        return 'The provided username does not exist';
    }

    const check = await checkHash(password, account.password);

    if (check == false) {
        return 'The provided password is incorrect';
    }

    cookies().set('accountToken', account.token, {
        secure: true,
        path: '/',
        maxAge: 2629746000,
        sameSite: true,
    });

    await mongoose.connection.close();
    return true;
}
