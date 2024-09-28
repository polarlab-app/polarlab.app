import { Schema, model, models } from 'mongoose';
import { getMongoConnection } from '@/lib/global/db';

const caseSchema = new Schema(
    {
        id: String,
        name: String,
        serverID: String,
        status: String,
        action: String,
        date: String,
        duration: String,
        users: {
            offenderID: String,
            offenderUsername: String,
            authorID: String,
            authorUsername: String,
        },
        details: {
            note: String,
            reason: String,
            proof: String,
        },
    },
    {
        collection: 'cases',
    }
);

const connection = await getMongoConnection('primary');
const caseModel = connection.models.caseModel || connection.model('caseModel', caseSchema);
export default caseModel;
