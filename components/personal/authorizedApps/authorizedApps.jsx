'use client';
import { useState, useEffect } from 'react';
import findUser from '@/lib/personal/findUser';
import EnterPassword from '../accountDetails/enterPassword';
import styles from '@css/personal/authorizedApps.module.css';
import Image from 'next/image';

export default function AuthorizedApps() {
    const [authorizedApps, setAuthorizedApps] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [appId, setAppId] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userAccount = JSON.parse(await findUser());
            setAuthorizedApps(userAccount.authorizedApps);
        };
        fetchUser();
    }, []);

    const handleDeauthorization = async (id) => {
        setAppId(id);
        setShowModal(true);
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    };

    function close() {
        setShowModal(false);
    }

    const scopes = {
        email: 'View your email address',
        authorizedApps: 'View your Authorized Apps',
        connections: 'View your Connections',
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Authorized Apps</h1>
            </div>
            <div className={styles.authorizedApps}>
                {authorizedApps ? (
                    authorizedApps.map((app, index) => (
                        <div className={styles.authorizedApp} key={index}>
                            <div className={styles.top}>
                                <Image
                                    width={128}
                                    height={128}
                                    alt='i'
                                    src={`https://cdn.polarlab.app/api/fetch/apps/icons/${app.id}/webp`}
                                    className={styles.logo}
                                />
                                <p className={styles.name}>{app.name}</p>
                                <button className={styles.button} onClick={() => handleDeauthorization(app.id)}>
                                    Deauthorize
                                </button>
                            </div>
                            <div className={styles.permissions}>
                                <p className={styles.info}>This App is allowed to:</p>
                                <ul className={styles.list}>
                                    <li className={styles.item}>
                                        <i className={`${styles.icon} icon-check`}></i>
                                        Access your profile
                                    </li>
                                    {app.scopes.map((scope, index) => {
                                        <li className={styles.item} key={index}>
                                            <i className={`${styles.icon} icon-check`}></i>
                                            {scopes[scope]}
                                        </li>;
                                    })}
                                </ul>
                            </div>
                            <p className={styles.date}>Date Added: {formatDate(app.date)}</p>
                        </div>
                    ))
                ) : (
                    <p>No Authorized Apps Found</p>
                )}
            </div>
            {showModal && <EnterPassword id={appId} close={() => setShowModal(false)} mode='deauthorize' />}
        </div>
    );
}
