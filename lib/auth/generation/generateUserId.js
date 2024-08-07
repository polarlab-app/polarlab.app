import userAccount from '@schemas/userAccount';
import mongoose from 'mongoose';

export default async function generateUserId() {
    try {
        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        const count = await userAccount.countDocuments();
        const id = count + 1;
        const formattedId = id.toString().padStart(12, '0');

        await mongoose.connection.close();
        return formattedId;
    } catch (error) {
        return false;
    }
}
