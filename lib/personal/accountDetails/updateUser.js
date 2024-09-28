'use server';
import validateEmail from '@/lib/auth/validation/validateEmail';
import validatePassword from '@/lib/auth/validation/validatePassword';
import validateUsername from '@/lib/auth/validation/validateUsername';
import userAccount from '@schemas/userAccount';
import checkHash from '@/lib/auth/validation/checkHash';
import { cookies } from 'next/headers';
import logout from '@/lib/auth/sessionManagement/logout';
import hashData from '@/lib/auth/security/hashData';

export default async function updateUser(username, email, password, appIcon, verifyPassword) {
    if (!username && !email && !password && !appIcon) {
        return JSON.stringify({ h: 'Action Failed', d: 'Failed to process user input', c: 'r', s: false });
    }
    if (!verifyPassword) {
        return JSON.stringify({ h: 'Action Failed', d: 'The provided password is incorrect', c: 'r', s: false });
    }
    const accountToken = cookies().get('accountToken');
    if (!accountToken) {
        return JSON.stringify({ h: 'Action Failed', d: 'You must be logged in to do that!', c: 'r', s: false });
    }

    if (
        (username && !(await validateUsername(username))) ||
        (password && (await validatePassword(password)) < 3) ||
        (email && !(await validateEmail(email)))
    ) {
        return JSON.stringify({ h: 'Action Failed', d: 'Invalid username, email or  password', c: 'r', s: false });
    }
    const account = await userAccount.findOne({ token: accountToken.value });
    if (!account) {
        await logout();
    }

    if (verifyPassword == 'null') {
        if (account.password != verifyPassword) {
            return JSON.stringify({ h: 'Action Failed', d: 'The provided password is incorrect', c: 'r', s: false });
        }
    } else {
        if (!(await checkHash(verifyPassword, account.password))) {
            return JSON.stringify({ h: 'Action Failed', d: 'The provided password is incorrect', c: 'r', s: false });
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
            return JSON.stringify({ h: 'Action Failed', d: 'Failed to upload profile picture', c: 'r', s: false });
        }
    }

    await account.save();
    return JSON.stringify({ h: 'Account Updated', d: 'You have successfully updated your account', c: 'g', s: true });
}
