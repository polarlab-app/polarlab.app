'use server';
import app from '@schemas/app';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';

export default async function deleteApp(appId) {
    try {
        const accountToken = cookies().get('accountToken');

        if (!accountToken) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        const account = await userAccount.findOne({ token: accountToken.value });

        if (!account) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        const appFile = await app.findOne({ id: appId });
        if (!appFile || appFile.ownerID != account.id) {
            return JSON.stringify({ h: 'Action Failed', d: 'Invalid app selected', c: 'r', s: false });
        }
        await app.deleteOne({ id: appId });
        return JSON.stringify({ h: 'App Deleted', d: 'You have successfully deleted the app', c: 'g', s: true });
    } catch (error) {
        console.log(error);
        return JSON.stringify({ h: 'Action Failed', d: 'An internal error has occurred', c: 'r', s: false });
    }
}
