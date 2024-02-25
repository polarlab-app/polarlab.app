import { BlogPostGrid } from '../../components/blogpost.jsx';

import styles from '../../src/css/blog/blog.module.css';
import posts from './posts.json';

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
