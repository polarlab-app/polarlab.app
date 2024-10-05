'use server';
import styles from '@css/blog/blog.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default async function BlogPostGrid(props) {
    console.log(props);

    return (
        <Link href={`/blog/posts/${props.href}`} className={styles.post}>
            <div className={styles.postimgcontainer}>
                <Image className={styles.postimg} src={props.coverimg} alt='alt' fill />
            </div>
            <div className={styles.posttext}>
                <div className={styles.textcontainer}>
                    <div className={styles.toptextcontainer}>
                        <p className={styles.postauthor}>
                            <img className={styles.pfp} src={props.pfp} alt='pfp' />
                            {props.author}
                        </p>
                        <div className={styles.title}>{props.title}</div>
                    </div>
                    <div className={styles.date}>{props.date}</div>
                </div>
            </div>
        </Link>
    );
}
