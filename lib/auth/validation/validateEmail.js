'use server';
import userAccount from '@schemas/userAccount';
import hashData from '../security/hashData';

export default async function validateEmail(email) {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        if (email.length > 64) {
            return false;
        }
        const hashedEmail = await hashData(email);

        const account = await userAccount.findOne({ email: hashedEmail });

        if (account) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
