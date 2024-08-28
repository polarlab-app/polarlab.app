import mongoose from 'mongoose';

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

const app = mongoose.models.app || mongoose.model('app', appSchema);
export default app;
