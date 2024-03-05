import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const checkPassword = require('../../../../lib/checkPassword');
const userAccount = require('../../../../src/schemas/userAccount.js');

import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        const URI = process.env.MONGO_URI;

        await mongoose.connect(URI || '', {
            authSource: 'admin',
        });

        const account = await userAccount.findOne({ username: username });

        if (!account) {
            console.log('invalidaccount');
            return NextResponse.json({ status: 'invalidAccount' });
        }

        const check = await checkPassword(password, account.password);

        if (check == false) {
            console.log('invalidpassword');
            return NextResponse.json({ status: 'invalidPassword' });
        }

        const token = 'PTKN' + (await generateToken());

        await cookies().set('accountToken', '');
        await cookies().set('username', '');

        await cookies().set('accountToken', token, { secure: true, path: '/', maxAge: 2629746000, sameSite: true });
        await cookies().set('username', username, { secure: true, path: '/', maxAge: 2629746000, sameSite: true });

        await userAccount.findOneAndUpdate({ username: username }, { token: token });

        return NextResponse.json({ status: 'loginSuccess' });
    } catch (error) {
        console.log(error);
    }
}

function generateToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789';
    let result = '';
    for (let i = 0; i < 128; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
