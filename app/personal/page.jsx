'use client';

import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '@css/personal/personal.module.css';
import findUser from '@lib/personal/findUser.js';
import NavBar from '@/components/personal/nav';

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
            {section === 'authorizedApps' && <AuthorizedApps />}
            {section === 'dangerZone' && <DangerZone />}
        </div>
    );
}

function AccountDetails() {
    return <div>Account Details Section</div>;
}

function Apps() {
    return <div>Apps Section</div>;
}

function AuthorizedApps() {
    return <div>Authorized Apps Section</div>;
}

function DangerZone() {
    return <div>Danger Zone Section</div>;
}
