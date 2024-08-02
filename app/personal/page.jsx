'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import styles from '@css/personal/personal.module.css';
import findUser from '@lib/personal/findUser.js';
import ButtonInput from '@/components/personal/buttonInput';
import Connections from '@/components/personal/connections';

/*export const metadata = {
    title: 'Polar Lab | Personal',
    description: 'The official profile management page for you Polar Lab account',
};*/

export default function Page() {
    const searchParams = useSearchParams();
    const [section, setSection] = useState('accountDetails');

    useEffect(() => {
        const page = searchParams.get('page');
        if (page) {
            setSection(page);
        }
    }, [searchParams]);

    return (
        <div className={styles.container}>
            {section === 'accountDetails' && <AccountDetails />}
            {section === 'apps' && <Apps />}
            {section === 'connections' && <ConnectionsScreen />}
            {section === 'authorizedApps' && <AuthorizedApps />}
            {section === 'dangerZone' && <DangerZone />}
        </div>
    );
}

function AccountDetails() {
    return <div className={styles.main}></div>;
}

function Apps() {
    return <div>Apps Section</div>;
}

function ConnectionsScreen() {
    return (
        <Suspense fallback={<div>Loading connections...</div>}>
            <Connections />
        </Suspense>
    );
}

function AuthorizedApps() {
    return <div>Authorized Apps Section</div>;
}

function DangerZone() {
    return (
        <div className={styles.main}>
            <div className={styles.inputwrapper}>
                <ButtonInput type='deleteAccount' />
            </div>
        </div>
    );
}
