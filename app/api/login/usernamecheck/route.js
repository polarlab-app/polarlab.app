import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
const userAccount = require('../../../../src/schemas/userAccount.js');

export async function POST(req) {
    try {
        const { username } = await req.json();

        const URI = process.env.MONGO_URI;

        await mongoose.connect(URI || '', {
            authSource: 'admin',
        });

        let account = await userAccount.findOne({ username: username });
        if (!account) {
            return await NextResponse.json({ status: 'available' });
        } else {
            return await NextResponse.json({ status: 'unavailable' });
        }
    } catch (error) {
        console.log(error);
        return await NextResponse.json({ error: error });
    }
}
