'use server';
import BlogPostGrid from '@components/blog/blogpost';
import styles from '@css/blog/blog.module.css';
//import posts from './posts.json';
import findPost from '@/lib/blog/findPost';
//import { useState, useEffect } from 'react';

/*export const metadata = {
    title: 'Polar Lab | Blog',
    description: 'The official Polar Lab blog post center',
};*/

export default async function Page() {
    /*const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function findPosts() {
            const result = await findPost();
            console.log(result);
            setPosts(result ? JSON.parse(result) : []);
        }

        findPosts();
    }, []);*/
    const result = await findPost();
    let posts;
    if (result) {
        posts = JSON.parse(result);
    }

    return (
        <>
            <div className={styles.main}>
                {posts ? (
                    posts.map((post, index) => {
                        return (
                            <BlogPostGrid
                                title={post.heading}
                                pfp={post.pfp}
                                author={post.authorId}
                                date={post.date}
                                key={index}
                                coverimg={post.cover}
                                href={post.slug}
                            />
                        );
                    })
                ) : (
                    <p>NO posts found</p>
                )}
            </div>
        </>
    );
}
