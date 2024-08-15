'use server';
import app from '@schemas/app';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function findApps() {
    const accountToken = cookies().get('accountToken');
    if (!accountToken) {
        redirect('/login');
    }
    const account = await userAccount.findOne({
        token: accountToken.value,
    });
    if (!account) {
        redirect('/login');
    }
    const apps = await app.find({
        ownerId: account.id,
    });
    return apps;
}
