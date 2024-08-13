import mongoose from 'mongoose';

const appSchema = new mongoose.Schema(
    {
        id: String,
        ownerId: String,
        date: String,
        name: String,
        users: String,
        redirectUri: [],
    },
    {
        collection: 'apps',
    }
);

const app = mongoose.models.app || mongoose.model('app', appSchema);
export default app;
