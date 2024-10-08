'use server';
import data from '@data/landing.json';
import styles from '@css/main/landing.module.css';
import Link from 'next/link';

export default async function Landing({ type }) {
    return (
        <div className={styles.top}>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <h1 className={styles.header}>{data.headings[type]}</h1>
            <h2 className={styles.subheader}>{data.descriptions[type]}</h2>
            <Link className={styles.button} href={data.redirects[type]}>
                {data.buttons[type]}
            </Link>
        </div>
    );
}
