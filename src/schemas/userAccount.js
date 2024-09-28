import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;
import { getMongoConnection } from '@/lib/global/db';

let userAccountSchema = new Schema(
    {
        id: String,
        username: String,
        email: String,
        password: String,
        token: String,
        properties: {
            role: String,
            date: String,
        },
        connections: [
            {
                id: String,
                name: String,
                date: String,
                email: String,
            },
        ],
        authorizedApps: [
            {
                id: String,
                name: String,
                date: String,
                secret: String,
                scopes: [],
            },
        ],
        support: [],
    },
    {
        collection: 'accounts',
    }
);
const connection = await getMongoConnection('primary');
const userAccount = connection.models.userAccount || connection.model('userAccount', userAccountSchema);
export default userAccount;
