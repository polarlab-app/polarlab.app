'use server';
import caseModel from '@schemas/case';

export default async function fetchCases(type, id) {
    const cases = await caseModel.find({ name: type, serverID: id }).sort({ date: -1 });

    return JSON.stringify(cases);
}
