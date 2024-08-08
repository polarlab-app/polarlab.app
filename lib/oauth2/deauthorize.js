import userAccount from '@schemas/userAccount';
import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function deauthorize(id) {
    try {
        await mongoose.connect(process.env.MONGO_URI || '', {
            authSource: 'admin',
        });

        const accountToken = cookies().get('accountToken');
        if (!accountToken) {
            redirect('/login');
        }

        if (!userAccount.findOne({ token: accountToken.value })) {
            redirect('/login');
        }

        const result = await userAccount.findOneAndUpdate(
            { token: accountToken.value },
            { $pull: { authorized_apps: { id: id } } },
            { new: true }
        );

        await mongoose.connection.close();

        if (result && result.authorized_apps.length < result.authorized_apps.length) {
            return true;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}
