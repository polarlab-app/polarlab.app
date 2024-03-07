import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
const bug = require('../../../../src/schemas/bug.js');

export async function GET(req) {
    const URI = process.env.MONGO_URI;

    await mongoose.connect(URI || '', {
        authSource: 'admin',
    });

    const bugs = await bug.find({});
    return NextResponse.json({ bugsArray: bugs });
}
