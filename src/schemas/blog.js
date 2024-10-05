import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        id: String,
        heading: String,
        slug: String,
        authorId: String,
        cover: String,
        date: String,
        content: String,
        likes: [],
        comments: [],
    },
    {
        collection: 'blog',
    }
);

const post = mongoose.models.post || mongoose.model('post', postSchema);
export default post;
