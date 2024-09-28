'use server';

import userAccount from '@schemas/userAccount';

export default async function validateUsername(username) {
    try {
        if (username.length > 24) {
            return false;
        }

        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/.test(username)) {
            return false;
        }

        let account = await userAccount.findOne({ username: username });

        if (account) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
