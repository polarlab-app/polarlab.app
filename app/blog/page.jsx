import BlogPostGrid from '@components/blog/blogpost';

import styles from '@css/blog/blog.module.css';
import posts from './posts.json';

export const metadata = {
    title: 'Polar Lab | Blog',
    description: 'The official Polar Lab blog post center',
};

export default function Page() {
    return (
        <>
            <div className={styles.main}>
                {posts.map((post, index) => {
                    return (
                        <BlogPostGrid
                            title={post.title}
                            pfp={post.pfp}
                            author={post.author}
                            date={post.date}
                            key={index}
                            coverimg={post.coverimg}
                            href={post.href}
                        />
                    );
                })}
            </div>
        </>
    );
}
