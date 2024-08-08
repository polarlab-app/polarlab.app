'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '@css/login/authorize.module.css';
import Image from 'next/image';
import authorize from '@lib/oauth2/authorize';
import { useEffect, useState } from 'react';
import findApp from '@lib/personal/findApp';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');
    const redirectUri = searchParams.get('redirect_uri');
    const [app, setApp] = useState(null);

    useEffect(() => {
        async function fetchApp() {
            if (appId) {
                const appData = await findApp();
                if (appData != false) {
                    const parsedAppData = JSON.parse(appData);
                    setApp(parsedAppData);
                } else {
                    router.push('/personal');
                }
            }
        }
        fetchApp();
    }, [appId, router]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Image
                        width={128}
                        height={128}
                        alt='pfp'
                        src={app?.pfp || 'https://placehold.co/128'}
                        className={styles.pfp}
                        unoptimized={true}
                    />
                    <p>An external application</p>
                    <h1>{app ? app.name : 'Loading...'}</h1>
                    <p>Wants to access your account</p>
                </div>
                <button className={styles.button} onClick={() => authorize(appId, redirectUri)}>
                    Authorize App
                </button>
            </div>
        </div>
    );
}
