'use server';

import mongoose from 'mongoose';

const bugSchema = require('../../src/schemas/bug');

export default async function getBug(issueId) {
    const URI = process.env.MONGO_URI;

    await mongoose.connect(URI || '', {
        authSource: 'admin',
    });

    const issue = await bugSchema.findOne({ id: issueId });

    return issue;
}
