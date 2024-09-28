'use server';
import app from '@schemas/app';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';

export default async function findApps() {
    const accountToken = cookies().get('accountToken');
    if (!accountToken) {
        return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
    }

    const account = await userAccount.findOne({
        token: accountToken.value,
    });
    if (!account) {
        return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
    }
    const apps = await app.find({
        ownerID: account.id,
    });

    return JSON.stringify(apps);
}
