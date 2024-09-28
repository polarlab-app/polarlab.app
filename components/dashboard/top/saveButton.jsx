'use client';
import styles from '@css/dashboard/topbar.module.css';

export default function SaveButton({ onClick }) {
    return (
        <button className={styles.save} onClick={onClick}>
            Save Changes
        </button>
    );
}
