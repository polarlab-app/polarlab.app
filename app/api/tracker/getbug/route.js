import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
const bugSchema = require('../../../../src/schemas/bug.js');

export async function GET() {
    try {
        const URI = process.env.MONGO_URI;

        await mongoose.connect(URI || '', {
            authSource: 'admin',
        });

        const bugs = await bugSchema.find({});
        return NextResponse.json({ bugsArray: bugs });
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req) {
    try {
        const { issueId } = await req.json();
        console.log(issueId);

        const URI = process.env.MONGO_URI;

        await mongoose.connect(URI || '', {
            authSource: 'admin',
        });

        const issue = await bugSchema.findOne({ id: issueId });

        return NextResponse.json({ issue: issue });
    } catch (error) {
        console.log(error);
    }
}
