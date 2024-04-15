'use client';

import styles from '@css/blog/blog.module.css';
import { useRouter } from 'next/navigation';

export default function BlogPostGrid(props) {
    const router = useRouter();

    function handleRedirect() {
        router.push(`/blog/posts/${props.href}`);
    }

    return (
        <div href={props.href} className={styles.post} onClick={handleRedirect}>
            <div className={styles.postimgcontainer}>
                <img className={styles.postimg} src={props.coverimg} alt='alt' />
            </div>
            <div className={styles.posttext}>
                <div className={styles.textcontainer}>
                    <div className={styles.toptextcontainer}>
                        <a className={styles.postauthor}>
                            <img className={styles.pfp} src={props.pfp} alt='pfp' />
                            {props.author}
                        </a>
                        <div className={styles.title}>{props.title}</div>
                    </div>
                    <div className={styles.date}>{props.date}</div>
                </div>
            </div>
        </div>
    );
}
