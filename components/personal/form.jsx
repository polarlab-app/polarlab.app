'use client';

import { useState } from 'react';
import styles from '../../src/css/main/personal.module.css';

import modifyUser from '@/lib/personal/modifyUser.js';

export default function Form() {
    const [username, setUsername] = useState(null);
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [pfp, setPfp] = useState(null);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function onSubmit() {
        if (!oldPassword) {
            setError('You need to provide your current password to make changes');
        }

        const result = await modifyUser(username, oldPassword, newPassword, pfp);

        if (result != 'success') {
            setError(result);
            return;
        }
        setSuccess('You have successfully updated your details');
    }

    return (
        <div className={styles.form}>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <label htmlFor='files' className={styles.fileinput}>
                Click To Upload Profile Picture
            </label>
            <input
                type='file'
                style={{ display: 'none' }}
                accept='image/png, image/jpeg, image/webp'
                onChange={(e) => setPfp(e.target.files[0])}
                id='files'></input>
            <input
                type='text'
                className={styles.input}
                placeholder='New Username'
                onChange={(e) => setUsername(e.target.value)}></input>
            <input
                type='password'
                className={`${styles.input} ${styles.doubleinput}`}
                placeholder='New Password'
                onChange={(e) => setNewPassword(e.target.value)}></input>
            <input
                type='password'
                className={`${styles.input} ${styles.doubleinput}`}
                placeholder='Your Password'
                onChange={(e) => setOldPassword(e.target.value)}
                required></input>

            <button onClick={onSubmit} className={styles.submitbtn}>
                Save Changes
            </button>
        </div>
    );
}
