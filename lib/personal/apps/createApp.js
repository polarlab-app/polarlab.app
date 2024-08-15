'use server';
import mongoose from 'mongoose';
import app from '@schemas/app';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import userAccount from '@schemas/userAccount';
import generateAppId from '@lib/auth/generation/generateAppId';

export default async function createApp(appName, redirectURIs, appIcon) {
    const appId = await generateAppId();
    const accountToken = cookies().get('accountToken');

    if (!accountToken) {
        redirect('/login');
    }

    await mongoose.connect(process.env.MONGO_URI || '', {
        authSource: 'admin',
    });

    const account = await userAccount.findOne({ token: accountToken.value });
    await mongoose.connection.close();
    if (!account) {
        redirect('/login');
    }

    // Decode base64 string to binary data
    const byteCharacters = atob(appIcon);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], `${appId}.png`, { type: 'image/png' });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', 'profilePicture');
    formData.append('filePath', `apps/${appId}.webp`);
    const response = await fetch('http://localhost:3003/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `${process.env.CDN_API_KEY}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to create app');
    }

    return await response.json();
}
