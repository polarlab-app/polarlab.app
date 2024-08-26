'use server';
import app from '@schemas/app';
import mongoose from 'mongoose';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function deleteApp(appId) {
    const accountToken = cookies().get('accountToken');

    if (!accountToken) {
        redirect('/login');
    }

    const account = await userAccount.findOne({ token: accountToken.value });

    if (!account) {
        redirect('/login');
    }

    const app = await app.findOne({ id: appId });
    if (!app || !app.ownerId != account.id) {
        redirect('/login');
    }
}
