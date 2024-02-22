import { BlogPostGrid } from '../../components/blogpost.jsx';

import '../../src/css/blog/blog.css';
import posts from '../../src/posts.json';

export default function Page() {
    return (
        <>
            <div className='main'>
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
