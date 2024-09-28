import userAccount from '@schemas/userAccount';
import mongoose from 'mongoose';

export default async function generateUserId() {
    try {
        const highestUser = await userAccount.findOne().sort({ id: -1 }).exec();
        const id = highestUser ? parseInt(highestUser.id) + 1 : 1;
        const formattedId = id.toString().padStart(12, '0');

        return formattedId;
    } catch (error) {
        return false;
    }
}
