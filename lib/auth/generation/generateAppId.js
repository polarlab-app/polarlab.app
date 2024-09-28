import app from '@schemas/app';
import mongoose from 'mongoose';

export default async function generateAppId() {
    try {
        const highestApp = await app.findOne().sort({ id: -1 });
        const id = highestApp ? parseInt(highestApp.id) + 1 : 1;
        const formattedId = id.toString().padStart(9, '0');

        return formattedId;
    } catch (error) {
        return false;
    }
}
