'use client';
import { useSearchParams } from 'next/navigation';
import styles from '@css/legal/nav.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Nav() {
    const [active, setActive] = useState('');
    const router = useRouter();
    const params = useSearchParams();
    useEffect(() => {
        const active = params.get('page');
        setActive(active);
    }, [params]);

    const handleClick = (page) => {
        setActive(page);
        router.push(`/legal?page=${page}`, undefined, { shallow: true });
    };

    return (
        <div className={styles.container}>
            <p
                className={`${styles.option} ${active == 'terms' ? styles.active : null}`}
                onClick={() => handleClick('terms')}
            >
                Terms Of Service
            </p>
            <p
                className={`${styles.option} ${active == 'privacy' ? styles.active : null}`}
                onClick={() => handleClick('privacy')}
            >
                Privacy Policy
            </p>
            <p
                className={`${styles.option} ${active == 'cookies' ? styles.active : null}`}
                onClick={() => handleClick('cookies')}
            >
                Cookie Policy
            </p>
        </div>
    );
}
