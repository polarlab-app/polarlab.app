'use server';

const hashData = require('./security/hashData');
const userAccount = require('../../src/schemas/userAccount');

export default async function register(username, email, password) {
    try {
        const hashedPassword = await hashData(password);
        const id = await crypto.randomUUID();

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
