'use server';
import mongoose from 'mongoose';
import guildData from '@schemas/guildData';
import json from '@data/dashboard.json';

export default async function saveData(data, id) {
    if (data == 0 || id == 0) {
        return 'fail';
    }

    await mongoose.connect(process.env.BOT_DB_URI || '', {
        authSource: 'admin',
    });

    const guild = await guildData.findOne({ id: id });
    if (!guild) {
        return 'fail';
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
    await guild.save();

    return 'success';
}
