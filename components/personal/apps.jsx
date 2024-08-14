'use client';
import styles from '@css/personal/apps.module.css';
import Image from 'next/image';
import CreateApp from './createApp';
import { useState } from 'react';

export default function Apps() {
    const [showCreateApp, setShowCreateApp] = useState(false);

    return (
        <>
            {showCreateApp && <CreateApp closeButton={() => setShowCreateApp(false)} />}
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.heading}>Applications</h1>
                    <button className={styles.create} onClick={() => setShowCreateApp(true)}>
                        <i className={`${styles.icon} icon-check-double`}></i>Create App
                    </button>
                </div>
                <div className={styles.apps}>
                    <div className={styles.app}>
                        <div className={styles.top}>
                            <Image
                                src='https://cdn.polarlab.app/api/fetch/img/polarlogo/png'
                                alt='Polar Lab Logo'
                                width={128}
                                height={128}
                                className={styles.logo}
                            />
                            <h2>Polar Lab</h2>
                            <button className={styles.button}>
                                <i className={`${styles.icon} icon-check-double`}></i>Edit App
                            </button>
                        </div>
                        <div className={styles.middle}>
                            <p className={styles.info}>App ID: 1234567890</p>
                            <p className={styles.info}>Users: 1234567890</p>
                            <p className={styles.info}>Redirect URIs: https://example.com/callback</p>
                            <p className={styles.info}>Date Created: 12/12/2023</p>
                        </div>
                    </div>
                </div>
                <p className={styles.delete}>Delete App</p>
            </div>
        </>
    );
}
