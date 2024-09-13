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
            return false;
        }

        return JSON.stringify(data);
    } catch (error) {
        return false;
    }
}
