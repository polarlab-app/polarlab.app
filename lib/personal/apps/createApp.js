'use server';
import mongoose from 'mongoose';
import app from '@schemas/app';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import userAccount from '@schemas/userAccount';
import generateAppId from '@lib/auth/generation/generateAppId';
import validateAppName from '@lib/personal/validation/validateAppName';

export default async function createApp(appName, redirectURIs, appIcon) {
    const appId = await generateAppId();
    const accountToken = cookies().get('accountToken');

    const appNameResult = await validateAppName(appName);
    if (!appNameResult) {
        return appNameResult;
    }

    if (!accountToken) {
        redirect('/login');
    }

    await mongoose.connect(process.env.MONGO_URI || '', {
        authSource: 'admin',
    });

    const account = await userAccount.findOne({ token: accountToken.value });
    if (!account) {
        redirect('/login');
    }

    await app.create({
        id: appId,
        ownerId: account.id,
        name: appName,
        date: new Date().toISOString(),
        userCount: '0',
        redirectURIs: redirectURIs,
    });

    await mongoose.connection.close();

    const byteArray = Uint8Array.from(atob(appIcon), (c) => c.charCodeAt(0));
    const file = new File([byteArray], `${appId}.png`, { type: 'image/png' });
    /*const byteCharacters = atob(appIcon);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], `${appId}.png`, { type: 'image/png' });*/

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', 'profilePicture');
    formData.append('filePath', `apps/${appId}.webp`);
    const response = await fetch('https://cdn.polarlab.app/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `${process.env.CDN_API_KEY}`,
        },
    });
    console.log(response);

    if (!response.ok) {
        throw new Error('Failed to create app');
    }

    return await response.json();
}
