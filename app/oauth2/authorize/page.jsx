'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '@css/login/authorize.module.css';
import Image from 'next/image';
import authorize from '@lib/oauth2/authorize';
import { useEffect, useState } from 'react';
import findApp from '@lib/personal/findApp';
import Link from 'next/link';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const appId = searchParams.get('id');
    const redirectUri = searchParams.get('redirect_uri');
    const [app, setApp] = useState(null);

    useEffect(() => {
        async function fetchApp() {
            if (appId) {
                const appData = await findApp(appId);
                console.log(appData);
                if (appData != false || appData != null) {
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
                    <p className={styles.description}>An external application</p>
                    <h1 className={styles.header}>{app ? app.name : 'Loading...'}</h1>
                    <p className={styles.description}>Wants to access your account</p>
                    <div className={styles.access}>
                        <h3 className={styles.accessheader}>This will allow {app ? app.name : 'Loading...'} to:</h3>
                        <ul className={styles.list}>
                            <li className={styles.listitem}>
                                <i className={`${styles.icon} icon-check-double`}></i>Access your username
                            </li>
                            <li className={styles.listitem}>
                                <i className={`${styles.icon} icon-check-double`}></i>Access your email address
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <Link href='/' className={styles.cancel}>
                        Cancel Transaction
                    </Link>
                    <button className={styles.button} onClick={() => authorize(appId, redirectUri)}>
                        Authorize App
                    </button>
                </div>
            </div>
        </div>
    );
}
