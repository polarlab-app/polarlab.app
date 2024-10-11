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
            <p className={`${styles.option} ${active == 'terms' ? styles.active : null}`}>Terms Of Service</p>
            <p className={`${styles.option} ${active == 'privacy' ? styles.active : null}`}>Privacy Policy</p>
            <p className={`${styles.option} ${active == 'cookies' ? styles.active : null}`}>Cookie Policy</p>
        </div>
    );
}
