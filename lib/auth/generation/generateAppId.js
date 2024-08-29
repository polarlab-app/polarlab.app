import app from '@schemas/app';
import mongoose from 'mongoose';

export default async function generateAppId() {
    try {
        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        const highestApp = await app.findOne().sort({ id: -1 });
        const id = highestApp ? parseInt(highestApp.id) + 1 : 1;
        const formattedId = id.toString().padStart(9, '0');

        await mongoose.connection.close();
        return formattedId;
    } catch (error) {
        console.error('Error generating user ID:', error);
        return false;
    }
}
