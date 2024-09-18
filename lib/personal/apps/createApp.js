'use server';
import mongoose from 'mongoose';
import app from '@schemas/app';
import { cookies } from 'next/headers';
import userAccount from '@schemas/userAccount';
import generateAppId from '@lib/auth/generation/generateAppId';
import validateAppName from '@lib/personal/validation/validateAppName';

export default async function createApp(appName, redirectURIs, appIcon, scopes) {
    const appId = await generateAppId();
    const accountToken = cookies().get('accountToken');

    const appNameResult = JSON.parse(await validateAppName(appName));
    if (!appNameResult.s) {
        return JSON.stringify(appNameResult);
    }

    if (!accountToken) {
        return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
    }

    await mongoose.connect(process.env.MONGO_URI || '', {
        authSource: 'admin',
    });

    const account = await userAccount.findOne({ token: accountToken.value });
    if (!account) {
        return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
    }

    await app.create({
        id: appId,
        name: appName,
        ownerID: account.id,
        date: new Date().toISOString(),
        userCount: '0',
        scopes: scopes,
        redirectURIs: redirectURIs,
    });

    await mongoose.connection.close();
    if (appIcon) {
        const byteArray = Uint8Array.from(atob(appIcon), (c) => c.charCodeAt(0));
        const file = new File([byteArray], `${appId}.png`, { type: 'image/png' });

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

        if (!response.ok) {
            return JSON.stringify({ h: 'Action Failed', d: 'Failed to upload profile picture', c: 'r', s: false });
        }
    }

    return JSON.stringify({ h: 'App Created', d: 'You have successfully created a new app', c: 'g', s: true });
}
