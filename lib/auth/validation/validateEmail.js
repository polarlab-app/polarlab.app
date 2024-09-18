'use server';
import mongoose from 'mongoose';
import userAccount from '@schemas/userAccount';
import hashData from '../security/hashData';

export default async function validateEmail(email) {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        if (email.length > 64) {
            return false;
        }
        const hashedEmail = await hashData(email);

        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        const account = await userAccount.findOne({ email: hashedEmail });

        if (account) {
            return false;
        }

        await mongoose.connection.close();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
