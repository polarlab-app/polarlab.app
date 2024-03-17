import { cookies } from 'next/headers';
import mongoose from 'mongoose';

export default async function deleteUser(token) {
    const URI = process.env.MONGO_URI;

    await mongoose.connect(URI || '', {
        authSource: 'admin',
    });
}
