'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import styles from '@css/personal/personal.module.css';
import ButtonInput from '@/components/personal/buttonInput';

/* Management Screens */
import Connections from '@/components/personal/connections/connections';
import AccountDetails from '@/components/personal/accountDetails/accountDetails';
import AuthorizedApps from '@/components/personal/authorizedApps/authorizedApps';
import Apps from '@/components/personal/apps/apps';

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
            {section === 'accountDetails' && <AccountDetailsScreen />}
            {section === 'apps' && <AppsScreen />}
            {section === 'connections' && <ConnectionsScreen />}
            {section === 'authorizedApps' && <AuthorizedAppsScreen />}
            {section === 'dangerZone' && <DangerZone />}
        </div>
    );
}

function AccountDetailsScreen() {
    return (
        <Suspense fallback={<div>Loading account details...</div>}>
            <AccountDetails />
        </Suspense>
    );
}

function AppsScreen() {
    return (
        <Suspense fallback={<div>Loading apps...</div>}>
            <Apps />
        </Suspense>
    );
}

function ConnectionsScreen() {
    return (
        <Suspense fallback={<div>Loading connections...</div>}>
            <Connections />
        </Suspense>
    );
}

function AuthorizedAppsScreen() {
    return (
        <Suspense fallback={<div>Loading Authorized Apps...</div>}>
            <AuthorizedApps />
        </Suspense>
    );
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
