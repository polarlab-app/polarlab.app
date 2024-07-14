'use server';

import hashData from './security/hashData';
const userAccount = require('@schemas/userAccount');
import validatePassword from './validation/validatePassword';
import validateUsername from './validation/validateUsername';

export default async function register(username, password) {
    try {
        const passwordCheck = validatePassword(password);
        const usernameCheck = validateUsername(username);

        if (passwordCheck != 'success') {
            return passwordCheck;
        } else if (usernameCheck != 'success') {
            return usernameCheck;
        }

        const hashedPassword = await hashData(password);
        const id = await crypto.randomUUID();

        await userAccount.create({
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
