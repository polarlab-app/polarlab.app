'use server';

import mongoose from 'mongoose';
import userAccount from '@schemas/userAccount';

export default async function findUser(token) {
    const URI = process.env.MONGO_URI;

    await mongoose.connect(URI || '', {
        authSource: 'admin',
    });

    let account = await userAccount.findOne({ token: token });
    if (!account) {
        return 'fail';
    }
    return JSON.stringify(account);
}
