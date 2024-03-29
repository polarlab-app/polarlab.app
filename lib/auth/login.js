'use server';

import mongoose from 'mongoose';

import checkHash from './validation/checkHash';
const userAccount = require('../../src/schemas/userAccount');

import generateToken from './security/generateToken';

import { cookies } from 'next/headers';

export default async function login(username, password) {
    const URI = process.env.MONGO_URI;

    await mongoose.connect(URI || '', {
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

    const token = 'PTKN' + (await generateToken());

    cookies().set('accountToken', token, { secure: true, path: '/', maxAge: 2629746000, sameSite: true });
    cookies().set('username', username, { secure: true, path: '/', maxAge: 2629746000, sameSite: true });

    await userAccount.findOneAndUpdate({ username: username }, { token: token });

    return 'success';
}
