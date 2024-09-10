'use client';
import Link from 'next/link';
import styles from '@css/personal/topNav.module.css';
import Image from 'next/image';
import logout from '@/lib/auth/sessionManagement/logout';
import { useNav } from './navContext';

export default function TopNav() {
    const { openStatus, setOpenStatus } = useNav();

    return (
        <div className={`${styles.nav}`}>
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
            <div className={styles.right}>
                <button className={styles.button} onClick={logout}>
                    Log Out
                </button>
                <div className={styles.menu}>
                    <i
                        className={`icon-bars ${styles.icon} ${openStatus ? styles.hidden : null}`}
                        onClick={() => setOpenStatus(true)}
                    ></i>
                    <i
                        className={`icon-xmark ${styles.icon} ${openStatus ? null : styles.hidden}`}
                        onClick={() => setOpenStatus(false)}
                    ></i>
                </div>
            </div>
        </div>
    );
}
