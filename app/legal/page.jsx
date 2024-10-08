'use client';
import { useSearchParams } from 'next/navigation';
import Terms from '@/components/legal/terms';
import Privacy from '@/components/legal/privacy';
import Nav from '@/components/legal/nav';
import styles from '@css/legal/legal.module.scss';

export default function Page() {
    const page = useSearchParams().get('page');

    if (!page) {
        window.location.href = '/legal?page=terms';
    }

    return (
        <div className={styles.wrapper}>
            <Nav />
            <div>{page === 'terms' ? <Terms /> : page === 'privacy' ? <Privacy /> : <></>}</div>
        </div>
    );
}
