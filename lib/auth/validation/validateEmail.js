'use server';
import mongoose from 'mongoose';
import userAccount from '@schemas/userAccount';
import hashData from '../security/hashData';

export default async function validateEmail(email) {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Invalid email format';
        }

        if (email.length > 64) {
            return 'Email must on exceed 64 characters';
        }
        const hashedEmail = await hashData(email);

        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        const account = await userAccount.findOne({ email: hashedEmail });

        if (account) {
            return 'Email already in use';
        }

        await mongoose.connection.close();
        return true;
    } catch (error) {
        console.log(error);

        return 'An internal error has occurred, please contact support';
    }
}
