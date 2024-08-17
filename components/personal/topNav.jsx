import Link from 'next/link';
import styles from '@css/personal/topNav.module.css';
import Image from 'next/image';

export default function TopNav() {
    return (
        <div className={styles.nav}>
            <div className={styles.header}>
                <Image
                    width={100}
                    height={100}
                    src='https://cdn.polarlab.app/api/fetch/img/polarlogo/png'
                    alt='Polar Lab'
                    className={styles.logo}
                />
                <h1 className={styles.heading}>Polar Lab</h1>
            </div>
            <div className={styles.linkContainer}>
                <Link href='https://polarlab.app' className={styles.link}>
                    Home
                </Link>
                <Link href='https://polarlab.app/blog' className={styles.link}>
                    Blog
                </Link>
                <Link href='https://polarlab.app/plus' className={styles.link}>
                    Polar Plus
                </Link>
            </div>
            <div className={styles.right}></div>
        </div>
    );
}
