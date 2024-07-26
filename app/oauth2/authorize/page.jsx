'use client';
import { useSearchParams } from 'next/navigation';
import styles from '@css/login/authorize.module.css';
import Image from 'next/image';

export default function Page() {
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');
    const name = searchParams.get('name');
    const pfp = searchParams.get('pfp');
    const redirectUri = searchParams.get('redirect_uri');

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Image
                        width={128}
                        height={128}
                        alt="pfp"
                        src={pfp || 'https://placehold.co/128'}
                        className={styles.pfp}
                    />
                    <p>An external application</p>
                    <h1>{name}</h1>
                    <p>Wants to access your account</p>
                </div>
                <button className={styles.button}>Authorize App</button>
            </div>
        </div>
    );
}
