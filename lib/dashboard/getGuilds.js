'use server';

import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import userAccount from '@/src/schemas/userAccount';
import guildData from '@/src/schemas/guildData';

export default async function getGuilds() {
    try {
        const accountToken = cookies().get('accountToken');
        if (!accountToken) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });
        const account = await userAccount.findOne({ token: accountToken.value });
        await mongoose.connection.close();
        if (!account) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        await mongoose.connect(process.env.BOT_DB_URI, { authSource: 'admin' });

        const filteredGuilds = await guildData.find({
            'data.ownerID': {
                $in: account.connections
                    .filter((connection) => connection.name === 'discord')
                    .map((connection) => connection.id),
            },
        });

        await mongoose.disconnect();
        return JSON.stringify(filteredGuilds);
    } catch (error) {
        console.log(error);
        return JSON.stringify({ h: 'Action Failed', d: 'An internal error has occurred', c: 'r', s: false });
    }
}
