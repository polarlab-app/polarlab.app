'use server';

import mongoose from 'mongoose';
import userAccount from '@schemas/userAccount';

export default async function validateUsername(username) {
    try {
        if (username.length > 24) {
            return false;
        }

        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/.test(username)) {
            return false;
        }
        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        let account = await userAccount.findOne({ username: username });
        await mongoose.connection.close();

        if (account) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
