'use server';
import mongoose from 'mongoose';
import caseModel from '@schemas/case';

export default async function fetchCases(type) {
    await mongoose.connect(process.env.BOT_DB_URI || '', {
        authSource: 'admin',
    });
    return JSON.stringify(await caseModel.find({ name: type }));
}
