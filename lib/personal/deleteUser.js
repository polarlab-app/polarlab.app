'use server';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';
const userAccount = require('@/src/schemas/userAccount');
import checkPassword from '../auth/validation/checkHash';

export default async function deleteUser(password) {
    const URI = process.env.MONGO_URI;

    await mongoose.connect(URI || '', {
        authSource: 'admin',
    });

    const user = await userAccount.findOne({ token: cookies().get('accountToken').value });

    if (!user) {
        return 'Invalid Token, please login again!';
    }

    const passwordCheck = await checkPassword(password, user.password);
    if (passwordCheck == false) {
        return 'Invalid Password, please try again!';
    }

    await userAccount.deleteOne({ token: cookies().get('accountToken').value });

    return 'success';
}
