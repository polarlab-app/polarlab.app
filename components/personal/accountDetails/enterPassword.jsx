'use client';
import styles from '@css/personal/modal.module.css';
import { useState } from 'react';
import updateUser from '@/lib/personal/accountDetails/updateUser';
import authenticateUser from '@/lib/personal/authenticateUser';
import deauthorize from '@/lib/oauth2/deauthorize';
import { triggerToast } from '@/components/core/toastNotifications';

export default function EnterPassword(props) {
    const [verifyPassword, setVerifyPassword] = useState('');
    const update = async () => {
        const res = JSON.parse(await authenticateUser(verifyPassword));
        if (res) {
            if (!res.s) {
                triggerToast(res.h, res.d, res.c);
                return;
            }
            if (props.mode == 'updateUser') {
                const result = JSON.parse(
                    await updateUser(props.username, props.email, props.password, props.appIcon, verifyPassword)
                );
                triggerToast(result.h, result.d, result.c);

                if (result.s) {
                    props.close();
                }
            } else if (props.mode == 'deauthorize') {
                const result = JSON.parse(await deauthorize(props.id));
                triggerToast(result.h, result.d, result.c);

                if (result.s) {
                    props.close();
                }
            } else if (props.mode == 'updateApp') {
            }
        } else {
            props.close();
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1 className={styles.heading}>Enter Your Password</h1>
                    <i className={`${styles.icon} icon-xmark`} onClick={props.close}></i>
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
