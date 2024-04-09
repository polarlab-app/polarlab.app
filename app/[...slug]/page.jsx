'use client';

import Link from 'next/link';
import styles from '@css/core/error.module.css';

export default function NotFound() {
    function reload() {
        window.location.reload();
    }

    return (
        <div className={styles.errorcontainer}>
            <div className={styles.left}>
                <div className={styles.textcontainer}>
                    <h1 className={styles.heading}>404 Not Found</h1>
                    <p className={styles.explanation}>
                        It appears that the page you are trying to access is not currently available. Please try again
                        or choose a new destination from the buttons on the right!
                    </p>
                </div>

                <div className={styles.buttons}>
                    <Link href='/' className={styles.button}>
                        Home
                    </Link>
                    <div className={styles.button} onClick={reload}>
                        Refresh
                    </div>
                </div>
            </div>
            <div className={styles.quicklinks}></div>
        </div>
    );
}
