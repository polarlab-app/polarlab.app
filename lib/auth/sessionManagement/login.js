'use server';

import mongoose from 'mongoose';
import checkHash from '../validation/checkHash';
const userAccount = require('@schemas/userAccount');
import generateToken from '../security/generateToken';
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

    const token = 'TKN::' + (await generateToken());

    cookies().set('accountToken', token, {
        secure: true,
        path: '/',
        maxAge: 2629746000,
        sameSite: true,
    });

    await userAccount.findOneAndUpdate({ username: username }, { token: token });

    await mongoose.connection.close();
    return true;
}
