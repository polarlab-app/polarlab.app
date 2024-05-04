'use server';

import fetch from 'node-fetch';
import { cookies } from 'next/headers';

export default async function getGuilds() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken').value;
    if (!accessToken) {
        return 'Access token is missing';
    }

    const url = 'https://discord.com/api/users/@me/guilds';
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            return `Failed to fetch guilds: ${response.statusText}`;
        }
        const guilds = await response.json();
        const ownedGuilds = guilds.filter((guild) => guild.owner);
        console.log(ownedGuilds);
        return ownedGuilds;
    } catch (error) {
        console.error('Error fetching guilds:', error);
        return 'Error fetching guilds';
    }
}
