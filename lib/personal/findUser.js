'use server';

import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';

export default async function findUser() {
    try {
        const accountToken = cookies().get('accountToken');
        const username = cookies().get('username');
        if (!accountToken || !username) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        let account = await userAccount.findOne({ token: accountToken.value });
        if (!account) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        const { token, password, ...sanitizedAccount } = account.toObject();

        if (!sanitizedAccount.authorizedApps || sanitizedAccount.authorizedApps.length === 0) {
            sanitizedAccount.authorizedApps = null;
        } else {
            sanitizedAccount.authorizedApps = sanitizedAccount.authorizedApps.map((app) => {
                const { secret, ...sanitizedApp } = app;
                return sanitizedApp;
            });
        }

        return JSON.stringify(sanitizedAccount);
    } catch (error) {
        return JSON.stringify({ h: 'Action Failed', d: 'An internal error has occurred', c: 'r', s: false });
    }
}
