'use server';

import { cookies } from 'next/headers';
import userAccount from '@/src/schemas/userAccount';
import guildData from '@/src/schemas/guildData';

export default async function getGuilds() {
    try {
        const accountToken = cookies().get('accountToken');
        if (!accountToken) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        const account = await userAccount.findOne({ token: accountToken.value });
        if (!account) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        const filteredGuilds = await guildData
            .find({
                $or: [
                    {
                        'data.ownerID': {
                            $in: account.connections
                                .filter((connection) => connection.name === 'discord')
                                .map((connection) => connection.id),
                        },
                    },
                    {
                        $and: [
                            {
                                'data.staff': {
                                    $elemMatch: {
                                        id: account.connections
                                            .filter((connection) => connection.name === 'discord')
                                            .map((connection) => connection.id)
                                            .toString(),
                                        value: 'dashboardAdministrator',
                                        status: true,
                                    },
                                },
                            },
                        ],
                    },
                ],
            })
            .sort({ name: 1 });

        return JSON.stringify(filteredGuilds);
    } catch (error) {
        console.log(error);
        return JSON.stringify({ h: 'Action Failed', d: 'An internal error has occurred', c: 'r', s: false });
    }
}
