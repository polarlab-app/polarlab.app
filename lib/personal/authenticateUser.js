'use server';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import userAccount from '@/src/schemas/userAccount';
import checkHash from '../auth/validation/checkHash';

export default async function authenticateUser(password) {
    const accountToken = cookies().get('accountToken');

    await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });
    const account = await userAccount.findOne({ token: accountToken.value });

    if (password == 'null' && password == account.password) {
        return true;
    }

    const res = await checkHash(password, account.password);
    if (res) {
        return true;
    }

    return false;
}
