'use server';

import hashData from './security/hashData';
import userAccount from '@schemas/userAccount';
import validatePassword from './validation/validatePassword';
import validateUsername from './validation/validateUsername';
import mongoose from 'mongoose';
import generateUserId from './generation/generateUserId';
import generateToken from './generation/generateToken';
import validateEmail from './validation/validateEmail';

export default async function register(username, email, password) {
    try {
        const usernameCheck = await validateUsername(username);
        const emailCheck = await validateEmail(email);
        const passwordCheck = await validatePassword(password);

        if (passwordCheck <= 3) {
            return passwordCheck;
        }
        if (usernameCheck !== true) {
            return usernameCheck;
        }
        if (emailCheck !== true) {
            return emailCheck;
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
            email: email,
            password: hashedPassword,
            token: token,
            properties: {
                role: 'user',
                pfp: '',
            },
            connections: {
                discord: '',
            },
            authorized_apps: [],
        });

        await mongoose.connection.close();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
