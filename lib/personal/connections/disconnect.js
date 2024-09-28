'use server';
import userAccount from '@schemas/userAccount';
import { cookies } from 'next/headers';
export default async function disconnect(name) {
    try {
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
