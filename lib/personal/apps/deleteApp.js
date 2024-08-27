'use server';
import app from '@schemas/app';
import mongoose from 'mongoose';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function deleteApp(appId) {
    try {
        const accountToken = cookies().get('accountToken');

        if (!accountToken) {
            redirect('/login');
        }

        await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });

        const account = await userAccount.findOne({ token: accountToken.value });

        if (!account) {
            redirect('/login');
        }

        const appFile = await app.findOne({ id: appId });
        if (!appFile || appFile.ownerID != account.id) {
            redirect('/login');
        }
        await app.deleteOne({ id: appId });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
