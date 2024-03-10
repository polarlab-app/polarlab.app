import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

import userAccount from '../../../../src/schemas/userAccount';

export default async function POST(req) {
    const { token } = await req.json();

    const URI = process.env.MONGO_URI;

    await mongoose.connect(URI || '', {
        authSource: 'admin',
    });

    const userDb = await userAccount.findOne({ token: token });

    if (!userDb) {
        return NextResponse.json({ status: 'invalidToken' });
    }
    return NextResponse.json({ user: userDb });
}
