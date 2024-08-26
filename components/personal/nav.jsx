'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '@css/personal/nav.module.css';
import logout from '@lib/auth/sessionManagement/logout';
import findUser from '@/lib/personal/findUser';
import { useNav } from './navContext';

export default function NavBar() {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState('accountDetails');
    const [account, setAccount] = useState(null);
    const { openStatus, setOpenStatus } = useNav();

    useEffect(() => {
        const loadAccount = async () => {
            const userAccount = JSON.parse(await findUser());
            setAccount(userAccount);
            const urlParams = new URLSearchParams(window.location.search);
            const page = urlParams.get('page');
            if (page) {
                setActiveItem(page);
            }
        };
        loadAccount();
    }, []);

    const handleNavItemClick = (item) => {
        setActiveItem(item);
        router.push(`/personal?page=${item}`);
    };

    return (
        <div className={`${styles.nav} ${openStatus ? styles.active : null}`}>
            <h2 className={styles.header}>👋 Welcome, {account?.username}</h2>
            <div
                className={`${styles.navitem} ${activeItem === 'accountDetails' ? styles.active : ''}`}
                onClick={() => handleNavItemClick('accountDetails')}
            >
                <i className={`icon-user ${styles.navicon}`}></i>
                <p className={styles.navtext}>Account Details</p>
            </div>
            <div
                className={`${styles.navitem} ${activeItem === 'authorizedApps' ? styles.active : ''}`}
                onClick={() => handleNavItemClick('authorizedApps')}
            >
                <i className={`icon-shield-check ${styles.navicon}`}></i>
                <p className={styles.navtext}>Authorized Apps</p>
            </div>
            <div
                className={`${styles.navitem} ${activeItem === 'apps' ? styles.active : ''}`}
                onClick={() => handleNavItemClick('apps')}
            >
                <i className={`icon-grid-2 ${styles.navicon}`}></i>
                <p className={styles.navtext}>Apps</p>
            </div>
            <div
                className={`${styles.navitem} ${activeItem === 'connections' ? styles.active : ''}`}
                onClick={() => handleNavItemClick('connections')}
            >
                <i className={`icon-link ${styles.navicon}`}></i>
                <p className={styles.navtext}>Connections</p>
            </div>
            <div
                className={`${styles.navitem} ${activeItem === 'dangerZone' ? styles.active : ''}`}
                onClick={() => handleNavItemClick('dangerZone')}
            >
                <i className={`icon-triangle-exclamation ${styles.navicon}`}></i>
                <p className={styles.navtext}>Danger Zone</p>
            </div>
            <button className={styles.logout} onClick={logout}>
                Log Out
            </button>
        </div>
    );
}
