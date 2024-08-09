'use server';
import app from '@schemas/app';
import mongoose from 'mongoose';
export default async function findApp(appId) {
    await mongoose.connect(process.env.MONGO_URI || '', {
        authSource: 'admin',
    });
    const appDocument = await app.findOne({ id: appId });
    await mongoose.connection.close();

    return JSON.stringify(appDocument) || false;
}
