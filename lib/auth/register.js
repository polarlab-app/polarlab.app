'use server';

import validateUsername from './validation/validateUsername';

const hashPassword = require('./security/hashPassword');
const userAccount = require('../../src/schemas/userAccount');

export default async function register(username, password) {
    try {
        const hashedPassword = await hashPassword(password);
        const id = await crypto.randomUUID();

        let result = await validateUsername(username);
        if (result != 'success') {
            return result;
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
