'use client';
import styles from '@/src/css/main/personal.module.css';
import { useState } from 'react';

import deleteUser from '@/lib/personal/deleteUser';

export default function Privacy() {
    const [modal, setModal] = useState(false);
    const [password, setPassword] = useState(null, true);

    async function handleDelete() {}

    return (
        <>
            {modal ? (
                <div className={styles.deletemodal}>
                    <div className={styles.innermodal}>
                        <h1 className={styles.deleteheader}>Delete Account?</h1>
                        <p className={styles.deletetext}>
                            If you are absolutely sure you want to delete your account enter your password below
                        </p>
                        <p className={styles.irreversible}>This action is irreversible!</p>
                        <input
                            className={styles.input}
                            type='password'
                            placeholder='Your Password'
                            onChange={(e) => setPassword(e.target.value)}></input>
                        <button className={styles.button} onClick={handleDelete}>
                            Delete Account
                        </button>
                    </div>
                </div>
            ) : null}
            <button
                className={styles.button}
                onClick={() => {
                    setModal(true);
                }}>
                Delete Account
            </button>
        </>
    );
}
