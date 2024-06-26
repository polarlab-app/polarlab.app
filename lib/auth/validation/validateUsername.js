'use server';

import mongoose from 'mongoose';
const userAccount = require('../../../src/schemas/userAccount');

export default async function validateUsername(username) {
    if (/[!@#$%^&*()_+`~{}|:;<>?,.]/.test(username)) {
        return 'Username must not include special characters';
    }
    const URI = process.env.MONGO_URI;

    await mongoose.connect(URI || '', {
        authSource: 'admin',
    });

    let account = await userAccount.findOne({ username: username });

    if (account) {
        return 'Username already taken';
    } else {
        return 'success';
    }
}
