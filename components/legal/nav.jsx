'use client';
import { useSearchParams } from 'next/navigation';
import styles from '@css/legal/nav.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Nav() {
    const [active, setActive] = useState('terms');
    const params = useSearchParams();
    useEffect(() => {
        const active = params.get('page');
        setActive(active);
    }, [params]);

    const handleClick = (page) => {
        setActive(page);
        const newParams = new URLSearchParams(window.location.search);
        newParams.set('page', page);
        window.history.replaceState({}, '', `${window.location.pathname}?${newParams}`);
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.item} ${active == 'terms' ? styles.active : null}`}
                onClick={() => handleClick('terms')}
            >
                <i className={`${styles.icon} icon-scroll`}></i>
                <p className={styles.description}>Terms Of Service</p>
            </div>

            <div
                className={`${styles.item} ${active == 'privacy' ? styles.active : null}`}
                onClick={() => handleClick('privacy')}
            >
                <i className={`${styles.icon} icon-shield-halved`}></i>
                <p className={styles.description}>Privacy Policy</p>
            </div>
            <div
                className={`${styles.item} ${active == 'cookies' ? styles.active : null}`}
                onClick={() => handleClick('cookies')}
            >
                <i className={`${styles.icon} icon-cookie`}></i>
                <p className={styles.description}>Cookie Policy</p>
            </div>
        </div>
    );
}
