'use client';

import { useRouter } from 'next/navigation';

export function BlogPostGrid(props) {
    const router = useRouter();

    function handleRedirect() {
        router.push(`/blog/posts/${props.href}`);
    }

    return (
        <div href={props.href} className='post' onClick={handleRedirect}>
            <div className='postimgcontainer'>
                <img className='postimg' src={props.coverimg} />
            </div>
            <div className='posttext'>
                <div className='textcontainer'>
                    <div className='toptextcontainer'>
                        <a className='postauthor'>
                            <img className='pfp' src={props.pfp} />
                            {props.author}
                        </a>
                        <div className='title'>{props.title}</div>
                    </div>
                    <div className='date'>{props.date}</div>
                </div>
            </div>
        </div>
    );
}
