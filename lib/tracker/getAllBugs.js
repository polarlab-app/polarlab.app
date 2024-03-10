'use server';

import mongoose from 'mongoose';

const bugSchema = require('@/src/schemas/bug');

export default async function getAllBugs() {
    try {
        const URI = process.env.MONGO_URI;

        await mongoose.connect(URI || '', {
            authSource: 'admin',
        });

        const issues = await bugSchema.find();

        return issues;
    } catch (error) {
        console.log(error);
    }
}
