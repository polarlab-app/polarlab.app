import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
const hashPassword = require('../../../../lib/hashPassword');
const userAccount = require('../../../../src/schemas/userAccount.js');

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        const URI = process.env.MONGO_URI;

        await mongoose.connect(URI || '', {
            authSource: 'admin',
        });

        const hashedPassword = await hashPassword(password);
        const id = await crypto.randomUUID();

        const document = await userAccount.create({
            id: id,
            username: username,
            password: hashedPassword,
            role: 'user',
            token: 'PTKN00',
        });

        if (document) {
            return await NextResponse.json({ status: 'success' });
        } else {
            return await NextResponse.json({ status: 'fail' });
        }
    } catch (error) {
        console.log(error);
        return await NextResponse.json({ error: error });
    }
}
