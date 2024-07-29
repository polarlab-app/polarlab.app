import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const bugSchema = new Schema(
    {
        id: String,
        author: String,
        title: String,
        description: String,
        reproduce: String,
        category: String,
        type: String,
        version: String,
        fixversion: String,
        status: String,
        priority: String,

        comments: [
            {
                username: String,
                comment: String,
            },
        ],
    },
    {
        collection: 'bugs',
    }
);

const bug = models.bug || model('bug', bugSchema);
export default bug;
