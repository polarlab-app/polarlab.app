'use server';
import app from '@schemas/app';
import userAccount from '@schemas/userAccount';
import generateSecret from '@lib/auth/generation/generateSecret';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function authorize(id, redirectUri) {
    const accountToken = cookies().get('accountToken');

    if (!accountToken) {
        redirect('/login');
    }

    const appData = await app.findOne({ id: id });
    const account = await userAccount.findOne({ token: accountToken.value });

    if (!appData || !account || !appData.redirectURIs || !appData.redirectURIs.includes(redirectUri)) {
        redirect('/login');
    }

    const secret = await generateSecret();
    const currentDate = new Date().toISOString();

    const existingAppIndex = account.authorizedApps.findIndex((app) => app.id === id);

    if (existingAppIndex !== -1) {
        account.authorizedApps[existingAppIndex].secret = secret;
    } else {
        account.authorizedApps.push({
            id: id,
            name: appData.name,
            date: currentDate,
            secret: secret,
            scopes: appData.scopes,
        });
    }

    await account.save();

    const redirectUrl = new URL(redirectUri);
    redirectUrl.searchParams.append('secret', secret);
    redirect(redirectUrl.toString());
}
