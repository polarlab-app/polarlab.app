'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import styles from '@css/personal/personal.module.css';
import ButtonInput from '@/components/personal/buttonInput';
import Connections from '@/components/personal/connections/connections';
import AccountDetails from '@/components/personal/accountDetails/accountDetails';
import AuthorizedApps from '@/components/personal/authorizedApps/authorizedApps';

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
            {section === 'accountDetails' && <AccountDetailsScreen />}
            {section === 'apps' && <Apps />}
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
