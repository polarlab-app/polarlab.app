'use server';

import mongoose from 'mongoose';
const userAccount = require('@schemas/userAccount');

export default async function validateUsername(username) {
    if (username.length > 24) {
        return 'Username must not exceed 24 characters';
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/.test(username)) {
        return 'Username must not include special characters';
    }

    try {
        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        let account = await userAccount.findOne({ username: username });

        if (account) {
            return 'Username already taken';
        } else {
            return 'success';
        }
    } finally {
        await mongoose.connection.close();
    }
}
