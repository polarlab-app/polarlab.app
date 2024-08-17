'use client';
import styles from '@css/personal/accountDetails.module.css';
import Image from 'next/image';
import findUser from '@/lib/personal/findUser';
import { useState, useEffect } from 'react';

export default function AccountDetails() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const userAccount = await findUser();
            setUser(userAccount);
            setUsername(userAccount.username);
            setEmail(userAccount.email);
        };
        fetchUser();
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Account Details</h1>
                <button className={styles.button}>Save Changes</button>
            </div>
            <div className={styles.account}>
                <div className={styles.iconContainer}>
                    <Image
                        src='https://cdn.polarlab.app/api/fetch/img/polarlogo/png'
                        width={512}
                        height={512}
                        alt='Profile Picture'
                        className={styles.icon}
                    />
                </div>
                <div className={styles.inputs}>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>Username</p>
                        <input
                            type='text'
                            placeholder='New Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>Email</p>
                        <input
                            type='text'
                            placeholder='New Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>Password</p>
                        <input
                            type='password'
                            placeholder='New Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
