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

    // OLD CODE:
    /*const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken').value;
    if (!accessToken) {
        return false;
    }

    const url = 'https://discord.com/api/users/@me/guilds';
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await xior.get(url, options);
        if (response.status !== 200) {
            return `Failed to fetch guilds: ${response.statusText}`;
        }
        const guilds = response.data;
        const botGuildsResponse = await xior.get('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        if (botGuildsResponse.status !== 200) {
            return `Failed to fetch bot's guilds: ${botGuildsResponse.statusText}`;
        }
        const botGuilds = botGuildsResponse.data;
        const botGuildIds = new Set(botGuilds.map((guild) => guild.id));
        const ownedAndBotGuilds = guilds.filter(
            (guild) => (guild.owner || (guild.permissions & 8) === 8) && botGuildIds.has(guild.id)
        );
        return ownedAndBotGuilds;
    } catch (error) {
        console.error('Error fetching guilds:', error);
        return 'Error fetching guilds';
    }*/
}
