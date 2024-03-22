import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
    // read route params
    const id = params.post;

    return {
        title: `Polar Lab Blog | ${id}`,
        description: id,
    };
}

export default function Page({ params }) {
    const post = params.post;

    const BlogPost = dynamic(() => import(`../../../../components/posts/${post}.jsx`), { suspense: true });

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <BlogPost />
        </Suspense>
    );
}
