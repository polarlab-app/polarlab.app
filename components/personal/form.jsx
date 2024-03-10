'use client';

import { useState } from 'react';
import styles from '../../src/css/main/personal.module.css';

export default function Form() {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [pfp, setPfp] = useState(null);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function onSubmit() {
        console.log(username);
        console.log(oldPassword);
        console.log(newPassword);
    }

    return (
        <form onSubmit={onSubmit} className={styles.form} encType='multipart/form-data' method='post'>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <input
                type='file'
                className={styles.fileinput}
                accept='image/png, image/jpeg, image/webp'
                onChange={(e) => setPfp(e.target.files[0])}></input>
            <input
                type='text'
                className={styles.input}
                placeholder='Username'
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

            <button type='submit' className={styles.submitbtn}>
                Save Changes
            </button>
        </form>
    );
}
