'use client';
import styles from '@css/dashboard/activity.module.css';
import { useState } from 'react';

export default function ActivityBar({ type }) {
    const [show, setShow] = useState(false);

    return (
        <div className={`${styles.bar} ${show ? styles.active : null}`}>
            <div className={styles.header}>
                <i className={`${styles.activityIcon} icon-folders`}></i>
                <p className={styles.heading}>Recent Activity</p>
                <i className={`${styles.upIcon} icon-caret-up`} onClick={() => setShow(!show)}></i>
            </div>
            <div className={styles.items}>
                <div className={styles.item}></div>
                <hr className={styles.divider} />
                <div className={styles.item}></div>
                <hr className={styles.divider} />
                <div className={styles.item}></div>
                <div className={styles.item}></div>
                <div className={styles.item}></div>
            </div>
        </div>
    );
}
