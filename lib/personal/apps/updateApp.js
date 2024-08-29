'use server';
import mongoose from 'mongoose';
import checkHash from '@/lib/auth/validation/checkHash';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import logout from '@/lib/auth/sessionManagement/logout';
import validateAppName from '../validation/validateAppName';
import app from '@schemas/app';

export default async function updateApp(appID, name, appIcon, redirectURIs, scopes) {
    if (!name && !appIcon && !redirectURIs && !scopes) {
        return 'ERR: Fields not inputted correctly';
    }
    if (!appID) {
        return false;
    }

    if (name && !(await validateAppName(name))) {
        return 'Invalid username';
    }

    await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });
    const appFile = await app.findOne({ id: appID });

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
            console.log(response);
            return false;
        }
    }

    await appFile.save();
    await mongoose.connection.close();
    return true;
}
