'use client';
import styles from '@css/personal/modal.module.css';
import { useState } from 'react';
import updateUser from '@/lib/personal/accountDetails/updateUser';
import authenticateUser from '@/lib/personal/authenticateUser';
import deauthorize from '@/lib/oauth2/deauthorize';

export default function EnterPassword({ username, email, password, appIcon, close, mode, id }) {
    const [verifyPassword, setVerifyPassword] = useState('');
    const update = async () => {
        const res = await authenticateUser(verifyPassword);
        if (res) {
            if (mode == 'addConnection') {
            } else if (mode == 'updateUser') {
                const result = await updateUser(username, email, password, appIcon, verifyPassword);
                if (result) {
                    close();
                } else {
                    alert('fail');
                }
            } else if (mode == 'deauthorize') {
                const result = await deauthorize(id);
                if (result) {
                    close();
                } else {
                    alert('fail');
                }
            }
        } else {
            close();
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1 className={styles.heading}>Enter Your Password</h1>
                    <i className={`${styles.icon} icon-xmark`} onClick={close}></i>
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
                    <i className={`${styles.icon} icon-check`}></i>Confirm Changes
                </button>
            </div>
        </div>
    );
}
