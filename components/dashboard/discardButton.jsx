'use client';
import styles from '@css/dashboard/topbar.module.css';

export default function DiscardButton({ onClick }) {
    return (
        <button className={styles.discard} onClick={onClick}>
            Discard
        </button>
    );
}
