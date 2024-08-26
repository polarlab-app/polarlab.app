'use server';
import mongoose from 'mongoose';
import validateEmail from '@/lib/auth/validation/validateEmail';
import validatePassword from '@/lib/auth/validation/validatePassword';
import validateUsername from '@/lib/auth/validation/validateUsername';
import userAccount from '@schemas/userAccount';
import checkHash from '@/lib/auth/validation/checkHash';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import logout from '@/lib/auth/sessionManagement/logout';
import hashData from '@/lib/auth/security/hashData';

export default async function updateUser(username, email, password, appIcon, verifyPassword) {
    if (!username && !email && !password) {
        return 'ERR: Fields not inputted correctly';
    }
    if (!verifyPassword) {
        return 'Password Required';
    }
    const accountToken = cookies().get('accountToken');
    if (!accountToken) {
        redirect('/login');
    }

    if (
        (username && !(await validateUsername(username))) ||
        (password && (await validatePassword(password)) < 3) ||
        (email && !(await validateEmail(email)))
    ) {
        return 'Invalid username, email or password';
    }

    await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });
    const account = await userAccount.findOne({ token: accountToken.value });
    if (!account) {
        await logout();
    }

    if (verifyPassword == 'null') {
        if (account.password != verifyPassword) {
            return 'Invalid password provided';
        }
    } else {
        if (!(await checkHash(verifyPassword, account.password))) {
            return 'Invalid password provided';
        }
    }
    if (password) {
        account.password = await hashData(password);
    }

    if (email) {
        account.email = email;
    }

    if (username) {
        account.username = username;
    }

    if (appIcon) {
        const byteArray = Uint8Array.from(atob(appIcon), (c) => c.charCodeAt(0));
        const file = new File([byteArray], `${account.id}.png`, { type: 'image/png' });
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileType', 'profilePicture');
        formData.append('filePath', `users/avatars/${account.id}.webp`);
        const response = await fetch('https://cdn.polarlab.app/api/upload', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `${process.env.CDN_API_KEY}`,
            },
        });
        if (!response.ok) {
            console.log(response);
            return false;
        }
    }

    await account.save();
    await mongoose.connection.close();
    return true;
}
