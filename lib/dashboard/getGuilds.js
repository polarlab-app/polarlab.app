'use server';

import { cookies } from 'next/headers';
import xior from 'xior';
import mongoose from 'mongoose';
import userAccount from '@/src/schemas/userAccount';
import guildData from '@/src/schemas/guildData';

export default async function getGuilds() {
    const accountToken = cookies().get('accountToken');
    if (!accountToken) {
        return false;
    }

    await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });
    const account = await userAccount.findOne({ token: accountToken.value });
    await mongoose.connection.close();
    if (!account) {
        return false;
    }

    await mongoose.connect(process.env.BOT_DB_URI, { authSource: 'admin' });

    const filteredGuilds = await guildData.find({
        'data.ownerId': {
            $in: account.connections
                .filter((connection) => connection.name === 'discord')
                .map((connection) => connection.id),
        },
    });

    await mongoose.disconnect();
    return JSON.stringify(filteredGuilds);
}
