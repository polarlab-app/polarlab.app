'use server';

import mongoose from 'mongoose';
import userAccount from '@schemas/userAccount';

export default async function validateUsername(username) {
    try {
        if (username.length > 24) {
            return 'Username must not exceed 24 characters';
        }

        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/.test(username)) {
            return 'Username must not include special characters';
        }
        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        let account = await userAccount.findOne({ username: username });
        await mongoose.connection.close();

        if (account) {
            return 'Username already taken';
        } else {
            return true;
        }
    } catch (error) {
        console.log(error);

        return 'An internal error has occurred, please contact support';
    }
}
