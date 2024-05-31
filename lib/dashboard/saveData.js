'use server';
import mongoose from 'mongoose';

export default async function saveData(data) {
    await mongoose.connect(process.env.BOT_DB_URI || '', {
        authSource: 'admin',
    });
}
