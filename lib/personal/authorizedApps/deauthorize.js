'use server';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import userAccount from '@/src/schemas/userAccount';
import { redirect } from 'next/navigation';

export default async function deauthorize(id) {
    try {
        const accountToken = cookies().get('accountToken');

        if (!accountToken) {
            redirect('/login');
        }

        await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });

        const account = await userAccount.findOne({ token: accountToken.value });

        if (!account) {
            redirect('/login');
        }

        await userAccount.findOneAndUpdate(
            { token: accountToken.value },
            { $pull: { authorizedApps: { id: id } } },
            { new: true }
        );

        return true;
    } catch (error) {}
}
