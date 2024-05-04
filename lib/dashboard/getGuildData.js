'use server';
import mongoose from 'mongoose';

export default async function getGuildData(guildId) {
    const uri = process.env.MONGO_DB_CONNECTION_STRING;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const guildData = await Guild.findOne({ id: guildId });

        if (!guildData) {
            return 'ERROR: Guild Not Found';
        }

        return JSON.stringify(guildData);
    } catch (error) {
        console.error('Failed to fetch guild data:', error);
        return 'Error fetching guild data';
    } finally {
        await mongoose.connection.close();
    }
}
