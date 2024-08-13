'use client';
import styles from '@css/personal/modal.module.css';
import { useState } from 'react';

export default function EnterPassword(onClick) {
    const [password, setPassword] = useState('');
    return (
        <div className={styles.modal}>
            <h1>Enter Your Password</h1>
            <input
                type='password'
                placeholder='********'
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={onClick}>
                <i className={`${styles.icon} icon-double-check`}></i>Confirm Changes
            </button>
        </div>
    );
}
