'use server';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';

export default async function deauthorize(id) {
    try {
        const accountToken = cookies().get('accountToken');
        if (!accountToken) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        if (!userAccount.findOne({ token: accountToken.value })) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        const result = await userAccount.findOneAndUpdate(
            { token: accountToken.value },
            { $pull: { authorizedApps: { id: id } } },
            { new: true }
        );

        if (result && !result.authorized_apps.some((app) => app.id === id)) {
            return JSON.stringify({
                h: 'App Deauthorizaed',
                d: 'You have successfully deauthorized the app from your account',
                c: 'r',
                s: false,
            });
        } else {
            return JSON.stringify({ h: 'Action Failed', d: 'An internal error has occurred', c: 'r', s: false });
        }
    } catch (error) {
        return JSON.stringify({ h: 'Action Failed', d: 'An internal error has occurred', c: 'r', s: false });
    }
}
