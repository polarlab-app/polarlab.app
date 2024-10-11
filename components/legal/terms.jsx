'use server';

import styles from '@css/legal/legal.module.scss';

export default async function Terms() {
    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}></div>
            <div className={styles.overview}></div>
        </div>
    );
}
