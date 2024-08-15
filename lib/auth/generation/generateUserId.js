import userAccount from '@schemas/userAccount';
import mongoose from 'mongoose';

export default async function generateUserId() {
    try {
        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        const highestUser = await userAccount.findOne().sort({ _id: -1 }).exec();
        const id = highestUser ? parseInt(highestUser._id) + 1 : 1;
        const formattedId = id.toString().padStart(12, '0');

        await mongoose.connection.close();
        return formattedId;
    } catch (error) {
        return false;
    }
}
