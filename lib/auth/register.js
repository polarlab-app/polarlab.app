'use server';

import hashData from './security/hashData';
const userAccount = require('@schemas/userAccount');
import validatePassword from './validation/validatePassword';
import validateUsername from './validation/validateUsername';
import mongoose from 'mongoose';

export default async function register(username, password) {
    try {
        const passwordCheck = await validatePassword(password);
        const usernameCheck = await validateUsername(username);

        if (passwordCheck !== 'success') {
            return passwordCheck;
        }
        if (usernameCheck !== 'success') {
            return usernameCheck;
        }

        const hashedPassword = await hashData(password);
        const id = crypto.randomUUID();

        if (!id || !hashedPassword) {
            return 'fail';
        }

        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        const account = await userAccount.create({
            id: id,
            username: username,
            password: hashedPassword,
            role: 'user',
            token: id,
        });

        return 'success';
    } catch (error) {
        console.log(error);
        return 'fail';
    }
}
