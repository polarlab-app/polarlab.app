'use server';
import post from '@schemas/blog';
import mongoose from 'mongoose';
export default async function findPost(slug) {
    try {
        await mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' });

        if (slug) {
            const foundPost = await post.findOne({ slug: slug });
            await mongoose.connection.close();
            if (foundPost) {
                return JSON.stringify(foundPost);
            } else {
                return false;
            }
        }

        const posts = await post.find();
        await mongoose.connection.close();
        return JSON.stringify(posts);
    } catch (error) {
        console.log(error);
        return false;
    }
}
