import mongoose from 'mongoose';

const appSchema = new mongoose.Schema(
    {
        id: String,
        ownerId: String,
        date: String,
        name: String,
        userCount: String,
        redirectURIs: [],
    },
    {
        collection: 'apps',
    }
);

const app = mongoose.models.app || mongoose.model('app', appSchema);
export default app;
