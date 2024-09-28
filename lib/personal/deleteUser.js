'use server';
import { cookies } from 'next/headers';
import userAccount from '@schemas/userAccount';
import checkHash from '../auth/validation/checkHash';
import { redirect } from 'next/navigation';
import logout from '../auth/sessionManagement/logout';

export default async function deleteUser(password) {
    const token = cookies().get('accountToken');

    if (!token) {
        redirect('/login');
    }

    const user = await userAccount.findOne({ token: token.value });

    if (!user) {
        await logout();
        return;
    }

    const passwordCheck = await checkHash(password, user.password);
    if (!passwordCheck) {
        return 'Invalid Password, please try again!';
    }

    await userAccount.deleteOne({ token: token.value });

    return true;
}
