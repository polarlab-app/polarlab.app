import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const appSchema = new Schema(
    {
        id: String,
        ownerId: String,
        pfp: String,
        name: String,
        secret: String,
        redirectUri: [],
    },
    {
        collection: 'apps',
    }
);

const app = models.app || model('app', appSchema);
export default app;
