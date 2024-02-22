import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export default function Page({ params }) {
    const post = params.post;

    const BlogPost = dynamic(() => import(`../../../../components/posts/${post}.jsx`), { suspense: true });

    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <BlogPost />
            </Suspense>
        </>
    );
}
