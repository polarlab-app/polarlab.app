'use server';

import mongoose from 'mongoose';
const hashPassword = require('./security/hashPassword');
const userAccount = require('../../src/schemas/userAccount');

export default async function register(username, password) {
    try {
        const URI = process.env.MONGO_URI;

        await mongoose.connect(URI || '', {
            authSource: 'admin',
        });

        const hashedPassword = await hashPassword(password);
        const id = await crypto.randomUUID();

        const possibleDocument = await userAccount.findOne({ username: username });

        if (possibleDocument) {
            return 'fail';
        }

        await userAccount.create({
            id: id,
            username: username,
            password: hashedPassword,
            role: 'user',
            token: 'PTKN00',
        });

        return 'success';
    } catch (error) {
        console.log(error);
        return 'fail';
    }
}
