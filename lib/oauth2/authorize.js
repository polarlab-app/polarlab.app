'use server';
import app from '@schemas/app';
import userAccount from '@schemas/userAccount';
import mongoose from 'mongoose';
import generateSecret from '@lib/auth/generation/generateSecret';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function authorize(id, redirectUri) {
    const accountToken = cookies().get('accountToken');

    if (!accountToken) {
        redirect('/login');
    }

    await mongoose.connect(process.env.MONGO_URI || '', {
        authSource: 'admin',
    });

    const appData = await app.findOne({ id: id });
    const account = await userAccount.findOne({ token: accountToken.value });

    if (!appData || !account || !appData.redirectUri.includes(redirectUri)) {
        await mongoose.connection.close();
        redirect('/login');
    }

    const secret = await generateSecret();
    const currentDate = new Date().toISOString();

    const existingAppIndex = account.authorized_apps.findIndex((app) => app.id === id);

    if (existingAppIndex !== -1) {
        account.authorized_apps[existingAppIndex].secret = secret;
    } else {
        account.authorized_apps.push({
            id: id,
            name: appData.name,
            date: currentDate,
            secret: secret,
        });
    }

    await account.save();
    await mongoose.connection.close();

    const redirectUrl = new URL(redirectUri);
    redirectUrl.searchParams.append('secret', secret);
    redirect(redirectUrl.toString());
}
