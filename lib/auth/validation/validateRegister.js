'use server';

import validateUsername from '../validation/validateUsername';
import validatePassword from '../validation/validatePassword';

import hashData from '../security/hashData';

export default async function register(username, password) {
    try {
        const vusresult = await validateUsername(username);
        const vpwresult = await validatePassword(password);

        if (vusresult != 'success') {
            return vusresult;
        }

        if (vpwresult != 'success') {
            return vpwresult;
        }

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
