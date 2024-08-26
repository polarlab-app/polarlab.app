'use server';
import userAccount from '@schemas/userAccount';
import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function disconnect(name) {
    try {
        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        const accountToken = cookies().get('accountToken');
        if (!accountToken) {
            redirect('/login');
        }

        if (!userAccount.findOne({ token: accountToken.value })) {
            redirect('/login');
        }

        const result = await userAccount.findOneAndUpdate(
            { token: accountToken.value },
            { $pull: { connections: { name: name } } },
            { new: true }
        );

        await mongoose.connection.close();

        if (result && !result.connections.some((connection) => connection.id === id)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}
