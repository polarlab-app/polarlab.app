'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '@css/personal/nav.module.css';

export default function NavBar() {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState('accountDetails');

    const handleNavItemClick = (item) => {
        setActiveItem(item);
        router.push(`/personal?page=${item}`);
    };

    return (
        <div className={styles.nav}>
            <h2 className={styles.header}>👋 Welcome, Aertic</h2>
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
                className={`${styles.navitem} ${activeItem === 'dangerZone' ? styles.active : ''}`}
                onClick={() => handleNavItemClick('dangerZone')}
            >
                <i className={`icon-triangle-exclamation ${styles.navicon}`}></i>
                <p className={styles.navtext}>Danger Zone</p>
            </div>
            <button className={styles.logout}>Log Out</button>
        </div>
    );
}
