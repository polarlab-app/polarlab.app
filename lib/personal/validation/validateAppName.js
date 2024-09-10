'use server';
import app from '@schemas/app';
import mongoose from 'mongoose';

export default async function validateAppName(appName) {
    if (appName.length > 16) {
        return 'App name must not be longer than 16 characters';
    }

    await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });
    const existingApp = await app.findOne({ name: appName });
    await mongoose.connection.close();

    if (existingApp) {
        return 'App name already taken';
    }

    return true;
}
