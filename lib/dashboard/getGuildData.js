'use server';
import mongoose from 'mongoose';
import guildData from '@schemas/guildData';

export default async function getGuildData(guildId) {
    try {
        await mongoose.connect(process.env.BOT_DB_URI || '', {
            authSource: 'admin',
        });
        const data = await guildData.findOne({ id: guildId });
        await mongoose.connection.close();

        if (!data) {
            return JSON.stringify({ h: 'Action Failed', d: 'Guild Data not found', c: 'r', s: false });
        }

        return JSON.stringify(data);
    } catch (error) {
        return JSON.stringify({ h: 'Action Failed', d: 'An internal error has occurred', c: 'r', s: false });
    }
}
