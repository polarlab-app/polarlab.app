import mongoose from 'mongoose';
import { getMongoConnection } from '@/lib/global/db';

const appSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        ownerID: String,
        date: String,
        userCount: String,
        scopes: [],
        redirectURIs: [],
    },
    {
        collection: 'apps',
    }
);
const connection = await getMongoConnection('primary');

const app = connection.mongoose.models.app || connection.mongoose.model('app', appSchema);
export default app;
