'use server';

import mongoose from 'mongoose';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function findUser() {
    try {
        const accountToken = cookies().get('accountToken');
        const username = cookies().get('username');
        if (!accountToken || !username) {
            redirect('/login');
        }
        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        let account = await userAccount.findOne({ token: accountToken.value });
        await mongoose.connection.close();
        if (!account) {
            return false;
        }

        const { token, password, ...sanitizedAccount } = account.toObject();

        if (!sanitizedAccount.authorized_apps || sanitizedAccount.authorized_apps.length === 0) {
            sanitizedAccount.authorized_apps = null;
        } else {
            sanitizedAccount.authorized_apps = sanitizedAccount.authorized_apps.map((app) => {
                const { secret, ...sanitizedApp } = app;
                return sanitizedApp;
            });
        }

        return JSON.stringify(sanitizedAccount);
    } catch (error) {
        return false;
    }
}
