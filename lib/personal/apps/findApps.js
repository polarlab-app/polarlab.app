'use server';
import app from '@schemas/app';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';

export default async function findApps() {
    const accountToken = cookies().get('accountToken');
    if (!accountToken) {
        redirect('/login');
    }

    await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });
    const account = await userAccount.findOne({
        token: accountToken.value,
    });
    if (!account) {
        redirect('/login');
    }
    const apps = await app.find({
        ownerId: account.id,
    });

    await mongoose.connection.close();
    return JSON.stringify(apps);
}
