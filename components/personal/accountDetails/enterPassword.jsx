'use client';
import styles from '@css/personal/modal.module.css';
import { useState } from 'react';
import updateUser from '@/lib/personal/accountDetails/updateUser';

export default function EnterPassword({ username, email, password, close }) {
    const [verifyPassword, setVerifyPassword] = useState('');
    const update = async () => {
        const result = await updateUser(username, email, password, verifyPassword);
        if (result) {
            close();
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1 className={styles.heading}>Enter Your Password</h1>
                    <i className={`${styles.icon} icon-grid-2`} onClick={close}></i>
                </div>
                <div className={styles.inputContainer}>
                    <p className={styles.label}>Enter Password</p>
                    <input
                        type='password'
                        placeholder='********'
                        className={styles.input}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                </div>
                <button onClick={update} className={styles.button}>
                    <i className={`${styles.icon} icon-check-double`}></i>Confirm Changes
                </button>
            </div>
        </div>
    );
}
