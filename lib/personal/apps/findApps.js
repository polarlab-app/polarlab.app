'use server';
import app from '@schemas/app';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';

export default async function findApps() {
    const accountToken = cookies().get('accountToken');
    if (!accountToken) {
        return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
    }

    await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });
    const account = await userAccount.findOne({
        token: accountToken.value,
    });
    if (!account) {
        return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
    }
    const apps = await app.find({
        ownerID: account.id,
    });

    await mongoose.connection.close();
    return JSON.stringify(apps);
}
