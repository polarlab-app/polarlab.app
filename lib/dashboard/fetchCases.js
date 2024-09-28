'use server';
import caseModel from '@schemas/case';

export default async function fetchCases(type, id) {
    return JSON.stringify(await caseModel.find({ name: type, serverID: id }));
}
