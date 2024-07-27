'use client';
import { useRouter } from 'next/navigation';
import { redirect, useSearchParams } from 'next/navigation';
import styles from '@css/login/deauthorize.module.css';
import Image from 'next/image';
import deauthorize from '@lib/oauth2/deauthorize';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Page() {
    const router = useRouter();
    const [result, setResult] = useState('');
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');
    const originUri = searchParams.get('origin');

    if (!appId) {
        router.push('/login');
        redirect('/login');
    }

    useEffect(() => {
        async function deauthorizeApp() {
            const response = await deauthorize(appId);
            setResult(response);
        }
        deauthorizeApp();
    }, [appId]);

    const redirectToOrigin = () => {
        router.push(originUri || '/login');
    };

    if (result.result === 'success') {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h1 className={styles.heading}>App Deauthorized</h1>
                    <p className={styles.text}>
                        You have successfully deauthorized <span className={styles.bold}>{result.name}</span> from your
                        account!
                    </p>
                    <Link href={'/discord'} className={styles.gethelp}>
                        Get Help
                    </Link>
                    <button className={styles.button} onClick={redirectToOrigin}>
                        <i className="icon-check-double"></i> Done
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h1 className={styles.heading}>Deauthorization Failed</h1>
                    <p className={styles.text}>
                        We have failed to deauthorize
                        <span className={styles.bold}>{result.name}</span> from your account
                    </p>
                    <Link href={'/discord'} className={styles.gethelp}>
                        Get Help
                    </Link>
                    <button className={styles.button} onClick={redirectToOrigin}>
                        Done
                    </button>
                </div>
            </div>
        );
    }
}
