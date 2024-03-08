'use client';

import { useState } from 'react';

export default function Form() {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    async function onSubmit(form) {}

    return (
        <form onSubmit={onSubmit}>
            <input
                type='text'
                class={styles.input}
                placeholder='Username'
                required
                onChange={(e) => setUsername(e.target.value)}></input>
            <input
                type='password'
                class={`${styles.input} ${styles.doubleinput}`}
                placeholder='Current Password'
                onChange={(e) => setOldPassword(e.target.value)}
                required></input>
            <input
                type='password'
                class={`${styles.input} ${styles.doubleinput}`}
                placeholder='New Password'
                onChange={(e) => setNewPassword(e.target.value)}
                required></input>
            <button type='submit' className={styles.submitbtn}></button>
        </form>
    );
}
