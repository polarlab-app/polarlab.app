'use server';
import mongoose from 'mongoose';
import guildData from '@schemas/guildData';
import userAccount from '@/src/schemas/userAccount';
import json from '@data/dashboard.json';
import { cookies } from 'next/headers';

export default async function saveData(data, id) {
    const accountToken = cookies().get('accountToken');
    if (!data || !id || !accountToken || !accountToken.value) return false;

    await mongoose.connect(process.env.MONGO_URI, {
        authSource: 'admin',
    });
    const account = await userAccount.findOne({ token: accountToken.value });
    if (!account) return false;
    await mongoose.disconnect();

    await mongoose.connect(process.env.BOT_DB_URI, {
        authSource: 'admin',
    });

    const guild = await guildData.findOne({ id: id });
    if (
        !guild ||
        (guild.ownerID != account.connections.find((connection) => connection.name === 'discord').id &&
            (!guild.data.staff || !guild.data.staff.includes(account.id)))
    )
        return false;

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
    await guild.save();
    await mongoose.disconnect();

    return true;
}
