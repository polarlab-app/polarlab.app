'use client';
import styles from '@css/core/cookies.module.css';
import Link from 'next/link';
import updateConsent from '@lib/privacy/cookieConsent';

export default function CookieConsent() {
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>🍪 Cookie Consent</h2>
            <p className={styles.text}>
                Heads up! This website uses cookies for functional and security purposes. By continuing to use this
                website, you agree to our use of cookies and for us to store data on your device. For more information
                please seek our privacy policy.
            </p>
            <Link href='/privacy' className={styles.privacy}>
                Privacy Policy
            </Link>
            <button className={styles.button} onClick={() => updateConsent()}>
                <i className={`icon-check-double ${styles.icon}`}></i>Accept
            </button>
        </div>
    );
}
