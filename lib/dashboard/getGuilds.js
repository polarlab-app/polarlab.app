'use server';

import { cookies } from 'next/headers';
import xior from 'xior';

export default async function getGuilds() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken').value;
    if (!accessToken) {
        return 'Access token is missing';
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
        const ownedAndBotGuilds = guilds.filter((guild) => guild.owner && botGuildIds.has(guild.id));
        return ownedAndBotGuilds;
    } catch (error) {
        console.error('Error fetching guilds:', error);
        return 'Error fetching guilds';
    }
}
