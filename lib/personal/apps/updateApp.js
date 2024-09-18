'use server';
import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import validateAppName from '../validation/validateAppName';
import app from '@schemas/app';

export default async function updateApp(appID, name, appIcon, redirectURIs, scopes) {
    if (!name && !appIcon && !redirectURIs && !scopes) {
        return JSON.stringify({ h: 'Action Failed', d: 'Failed to process user inputs', c: 'r', s: false });
    }
    if (!appID) {
        return JSON.stringify({ h: 'Action Failed', d: 'The selected app was not found', c: 'r', s: false });
    }

    if (!JSON.parse(await validateAppName(name)).res) {
        return await validateAppName(name);
    }
    const accountToken = cookies().get('accountToken');
    if (!accountToken) {
        return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
    }

    await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });
    const account = await userAccount.findOne({ token: accountToken.value });

    if (!account) {
        return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
    }
    const appFile = await app.findOne({ id: appID });
    if (!appFile) {
        return JSON.stringify({ h: 'Action Failed', d: 'The selected app was not found', c: 'r', s: false });
    }

    if (name) {
        appFile.name = name;
    }

    if (redirectURIs) {
        appFile.redirectURIs = redirectURIs;
    }
    if (scopes) {
        appFile.scopes = scopes;
    }

    if (appIcon) {
        const byteArray = Uint8Array.from(atob(appIcon), (c) => c.charCodeAt(0));
        const file = new File([byteArray], `${appID}.png`, { type: 'image/png' });
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileType', 'profilePicture');
        formData.append('filePath', `apps/avatars/${appFile.id}.webp`);
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

    await appFile.save();
    await mongoose.connection.close();
    return JSON.stringify({ h: 'App Updated', d: 'The selected app has been updated', c: 'r', s: false });
}
