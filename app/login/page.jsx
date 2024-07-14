'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import login from '@lib/auth/login';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from '@css/main/login.module.css';

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const router = useRouter();
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.header}>
                        <Image
                            src="https://cdn.polarlab.app/src/img/polarlogo.png"
                            alt="polarlogo"
                            className={styles.logo}
                            height={512}
                            width={512}
                        />
                        <h1 className={styles.heading}>Login To Polar Lab</h1>
                    </div>
                    <div className={styles.inputs}>
                        <div className={styles.inputcontainer}>
                            <p className={styles.inputlabel}>Username</p>
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                className={styles.input}
                            ></input>
                        </div>
                        <div className={styles.inputcontainer}>
                            <p className={styles.inputlabel}>Password</p>
                            <input
                                type="password"
                                placeholder="********"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className={styles.input}
                            ></input>
                        </div>
                    </div>
                    <div className={styles.buttoncontainer}>
                        <button
                            className={`${styles.loginbtn} ${styles.button}`}
                        >
                            Login to Polar Lab
                        </button>
                        <button
                            className={`${styles.discordloginbtn} ${styles.button}`}
                            onClick={() => {
                                window.location.href = router.push(
                                    '/oauth2/login/discord'
                                );
                            }}
                        >
                            Login With Discord
                        </button>
                    </div>
                </div>
                <div className={styles.right}></div>
            </div>
        </div>
    );
}
