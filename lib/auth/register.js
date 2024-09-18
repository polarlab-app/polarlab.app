'use server';

import hashData from './security/hashData';
import userAccount from '@schemas/userAccount';
import validatePassword from './validation/validatePassword';
import validateUsername from './validation/validateUsername';
import mongoose from 'mongoose';
import generateUserId from './generation/generateUserId';
import generateToken from './generation/generateToken';
import validateEmail from './validation/validateEmail';
import { cookies } from 'next/headers';

export default async function register(username, email, password) {
    try {
        if (!username || !email || !password) {
            return JSON.stringify({
                h: 'Registration Failed',
                d: 'Invalid username, email or password entered',
                c: 'r',
                s: false,
            });
        }

        const usernameCheck = await validateUsername(username);
        const emailCheck = await validateEmail(email);
        const passwordCheck = await validatePassword(password);

        if (passwordCheck < 3 || !usernameCheck || !emailCheck) {
            return JSON.stringify({
                h: 'Registration Failed',
                d: 'Invalid username, email or password entered',
                c: 'r',
                s: false,
            });
        }

        const hashedPassword = await hashData(password);
        const id = await generateUserId();
        const token = await generateToken();

        if (!id || !hashedPassword || !token) {
            return JSON.stringify({
                h: 'Registration Failed',
                d: 'An internal error has occurred',
                c: 'r',
                s: false,
            });
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
                date: new Date().toISOString(),
            },
            connections: [],
            authorizedApps: [],
            support: [],
        });

        cookies().set('accountToken', token, {
            secure: true,
            path: '/',
            maxAge: 1209600,
            sameSite: true,
        });
        cookies().set('username', username, {
            secure: true,
            path: '/',
            maxAge: 1209600,
            sameSite: true,
        });

        await mongoose.connection.close();
        return JSON.stringify({
            h: 'Registration Successful',
            d: 'You have successfully registered your account',
            c: 'g',
            s: true,
        });
    } catch (error) {
        return JSON.stringify({
            h: 'Registration Failed',
            d: 'Invalid username, email or password entered',
            c: 'r',
            s: false,
        });
    }
}
