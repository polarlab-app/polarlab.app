'use server';
import guildData from '@schemas/guildData';
import userAccount from '@schemas/userAccount';
import json from '@data/dashboard.json';
import { cookies } from 'next/headers';

export default async function saveData(data, id) {
    try {
        const accountToken = cookies().get('accountToken');
        if (!data || !id || !accountToken || !accountToken.value)
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        const account = await userAccount.findOne({ token: accountToken.value });
        if (!account) {
            return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
        }

        const guild = await guildData.findOne({ id: id });
        if (
            !guild ||
            (guild.data.ownerID != account.connections.find((connection) => connection.name === 'discord').id &&
                (!guild.data.staff ||
                    !guild.data.staff.find(
                        (staff) =>
                            staff.id == account.connections.find((connection) => connection.name === 'discord').id &&
                            staff.status &&
                            staff.value == 'dashboardAdministrator'
                    )))
        ) {
            return JSON.stringify({ h: 'Action Failed', d: 'Insufficient permissions', c: 'r', s: false });
        }

        for (const [key, value] of Object.entries(data)) {
            const path = json.paths[key];
            if (path) {
                const pathParts = path.split('/').filter((part) => part !== '');
                let currentPart = guild;
                for (let i = 0; i < pathParts.length - 1; i++) {
                    if (!currentPart[pathParts[i]]) {
                        currentPart[pathParts[i]] = {};
                    }
                    currentPart = currentPart[pathParts[i]];
                }
                currentPart[pathParts[pathParts.length - 1]] = value;
            }
        }

        await guild.markModified('config');
        await guild.markModified('data');
        await guild.save();
        return JSON.stringify({ h: 'Data Saved', d: 'Updated data save successfully', c: 'g', s: true });
    } catch (error) {
        console.log(error);
        return JSON.stringify({ h: 'Action Failed', d: 'An internal error has occurred', c: 'r', s: false });
    }
}
