'use server';

import validatePassword from '@/lib/auth/validation/validatePassword';
import validateUsername from '@/lib/auth/validation/validateUsername';
import checkPassword from '@/lib/auth/validation/checkHash';
import hashPassword from '@/lib/auth/security/hashData';

import { cookies } from 'next/headers';
import mongoose from 'mongoose';

const userAccount = require('@/src/schemas/userAccount');
export default async function modifyUser(username, password, newPassword, pfp) {
    const token = cookies().get('accountToken').value;
    if (!token) {
        return 'You must be logged in to do that!';
    }
    if (!password) {
        return 'Invalid Password';
    }

    if (newPassword) {
        let result = await validatePassword(newPassword);
        if (result != 'success') {
            return result;
        }
    }

    if (username) {
        let result = await validateUsername(username);
        if (result != 'success') {
            return result;
        }
    }

    await mongoose.connect(process.env.MONGO_URI || '', {
        authSource: 'admin',
    });

    const account = await userAccount.findOne({ token: token });

    if (!account) {
        return 'Your session token is invalid';
    }

    let passwordcheck = await checkPassword(password, account.password);

    if (passwordcheck == false) {
        return 'The provided password is incorrect';
    }

    if (username) {
        account.username = username;
    }
    if (newPassword) {
        account.password = await hashPassword(newPassword);
    }
    await account.save();
    return 'success';
}
