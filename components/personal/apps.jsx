'use client';
import styles from '@css/personal/apps.module.css';
import Image from 'next/image';
import CreateApp from './createApp';
import { useState } from 'react';

export default function Apps() {
    const [showCreateApp, setShowCreateApp] = useState(false);
    const [editApp, setEditApp] = useState(false);

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
                    <div className={`${styles.app} ${editApp ? styles.active : ''}`}>
                        <div className={styles.top}>
                            <Image
                                src='https://cdn.polarlab.app/api/fetch/img/polarlogo/png'
                                alt='Polar Lab Logo'
                                width={128}
                                height={128}
                                className={styles.logo}
                            />
                            <h2>Polar Lab</h2>
                            <button className={styles.button} onClick={() => setEditApp(!editApp)}>
                                <i className={`${styles.icon} icon-check-double`}></i>Edit App
                            </button>
                        </div>
                        <div className={styles.middle}>
                            {editApp ? (
                                <ul className={styles.info}>
                                    <li className={styles.infoItem}>
                                        <label>
                                            App ID: <input type='text' defaultValue='1234567890' />
                                        </label>
                                    </li>
                                    <li className={styles.infoItem}>
                                        <label>
                                            Users: <input type='text' defaultValue='1234567890' />
                                        </label>
                                    </li>
                                    <li className={styles.infoItem}>
                                        <label>
                                            Redirect URIs:{' '}
                                            <input type='text' defaultValue='https://example.com/callback' />
                                        </label>
                                    </li>
                                    <li className={styles.infoItem}>
                                        <label>
                                            Date Created: <input type='text' defaultValue='12/12/2023' />
                                        </label>
                                    </li>
                                </ul>
                            ) : (
                                <ul className={styles.info}>
                                    <li className={styles.infoItem}>App ID: 1234567890</li>
                                    <li className={styles.infoItem}>Users: 1234567890</li>
                                    <li className={styles.infoItem}>Redirect URIs: https://example.com/callback</li>
                                    <li className={styles.infoItem}>Date Created: 12/12/2023</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <p className={styles.delete}>Delete App</p>
            </div>
        </>
    );
}
