'use server';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import userAccount from '@schemas/userAccount';
import checkHash from '../auth/validation/checkHash';

export default async function authenticateUser(password) {
    const accountToken = cookies().get('accountToken');
    if (!accountToken) {
        return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
    }

    await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });
    const account = await userAccount.findOne({ token: accountToken.value });
    if (!account) {
        return JSON.stringify({
            h: 'Action Failed',
            d: 'You must be logged in to do that!',
            c: 'r',
            s: false,
        });
    }

    if (password == 'null' && password == account.password) {
        return JSON.stringify({ h: '', d: '', c: '', s: true });
    }

    const res = await checkHash(password, account.password);
    if (res) {
        return JSON.stringify({ h: '', d: '', c: '', s: true });
    }

    return JSON.stringify({ h: 'Invalid Password', d: 'The provided password is incorrect', c: 'r', s: false });
}
