'use server';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import findPost from '@/lib/blog/findPost';

export async function generateMetadata({ params }) {
    const id = params.post;

    const meta = await formatString(id);

    return {
        title: `Polar Lab Blog | ${meta}`,
        description: id,
    };
}

export default async function Page({ params }) {
    const post = params.post;

    /*const BlogPost = dynamic(
        () => import(`@components/blog/posts/${post}.jsx`),
        { suspense: true }
    );*/

    const BlogPost = JSON.parse(await findPost(post));

    return <Suspense fallback={<p>Loading...</p>}>{JSON.stringify(BlogPost)}</Suspense>;
}

function formatString(str) {
    return str.replace(/-/g, ' ').replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });
}
