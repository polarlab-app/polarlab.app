'use server';

import hashData from './security/hashData';
import userAccount from '@schemas/userAccount';
import validatePassword from './validation/validatePassword';
import validateUsername from './validation/validateUsername';
import mongoose from 'mongoose';
import generateUserId from './generation/generateUserId';
import generateToken from './generation/generateToken';

export default async function register(username, password) {
    try {
        const passwordCheck = await validatePassword(password);
        const usernameCheck = await validateUsername(username);

        if (passwordCheck !== true) {
            return passwordCheck;
        }
        if (usernameCheck !== true) {
            return usernameCheck;
        }

        const hashedPassword = await hashData(password);
        const id = await generateUserId();
        const token = await generateToken();

        if (!id || !hashedPassword || !token) {
            return false;
        }

        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        await userAccount.create({
            id: id,
            username: username,
            password: hashedPassword,
            pfp: '',
            role: 'user',
            token: token,
            discordId: '',
            authorized_apps: [],
        });

        await mongoose.connection.close();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
