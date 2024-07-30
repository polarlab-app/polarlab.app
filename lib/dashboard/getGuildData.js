'use server';
import mongoose from 'mongoose';
import guildData from '@schemas/guildData';

export default async function getGuildData(guildId) {
    try {
        await mongoose.connect(process.env.BOT_DB_URI || '', {
            authSource: 'admin',
        });
        const data = await guildData.findOne({ id: guildId });

        if (!data) {
            return 'ERROR: Guild Not Found';
        }

        return JSON.stringify(data);
    } catch (error) {
        console.error('Failed to fetch guild data:', error);
        return 'Error fetching guild data';
    } finally {
        await mongoose.connection.close();
    }
}
