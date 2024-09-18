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
            return JSON.stringify({
                h: 'Action Failed',
                d: 'You must be logged in to do that!',
                c: 'r',
                s: false,
            });
        }

        if (!userAccount.findOne({ token: accountToken.value })) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        const result = await userAccount.findOneAndUpdate(
            { token: accountToken.value },
            { $pull: { connections: { name: name } } },
            { new: true }
        );

        await mongoose.connection.close();

        if (result && !result.connections.some((connection) => connection.id === id)) {
            return JSON.stringify({
                h: 'Connection Revoked',
                d: 'You have successfully revoked the connection',
                c: 'g',
                s: true,
            });
        } else {
            return JSON.stringify({ h: 'Action Failed', d: 'An internal error has occurred', c: 'r', s: false });
        }
    } catch (error) {
        return JSON.stringify({ h: 'Action Failed', d: 'An internal error has occurred', c: 'r', s: false });
    }
}
