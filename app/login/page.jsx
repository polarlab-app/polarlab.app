'use client';
import React, { useState } from 'react';
import login from '@lib/auth/login';
import register from '@lib/auth/register';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from '@css/login/login.module.css';

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [page, setPage] = useState('login');

    const router = useRouter();

    const handleLogin = async (username, password) => {
        const res = await login(username, password);
        if (res !== 'success') {
            setError(res);
        } else {
            setSuccess('Successfully logged in!');
            router.push('/personal');
        }
    };

    const handleRegister = async (username, password) => {
        const res = await register(username, password);
        if (res !== 'success') {
            setError(res);
        } else {
            setSuccess(res);
            router.push('/login');
        }
    };

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
                            unoptimized={true}
                        />
                        <h1 className={styles.heading}>
                            {page === 'login'
                                ? 'Login To Polar Lab'
                                : 'Register To Polar Lab'}
                        </h1>
                    </div>
                    <div className={styles.inputs}>
                        <p className={styles.success}>
                            {success ? success : ''}
                        </p>
                        <p className={styles.error}>{error ? error : ''}</p>
                        <div className={styles.inputcontainer}>
                            <p className={styles.inputlabel}>Username</p>
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username ? username : ''}
                                className={styles.input}
                            ></input>
                        </div>
                        <div className={styles.inputcontainer}>
                            <p className={styles.inputlabel}>Password</p>
                            <input
                                type="password"
                                placeholder="********"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password ? password : ''}
                                className={styles.input}
                            ></input>
                        </div>
                    </div>
                    <div className={styles.buttoncontainer}>
                        {page === 'login' ? (
                            <p className={styles.switchtext}>
                                Dont have an account? Register
                                <span
                                    className={styles.switchbutton}
                                    onClick={() => setPage('register')}
                                >
                                    here
                                </span>
                            </p>
                        ) : (
                            <p className={styles.switchtext}>
                                Already have an account? Login
                                <span
                                    className={styles.switchbutton}
                                    onClick={() => setPage('login')}
                                >
                                    here
                                </span>
                            </p>
                        )}
                        <button
                            className={`${styles.loginbtn} ${styles.button}`}
                            onClick={() => {
                                page === 'login'
                                    ? handleLogin(username, password)
                                    : handleRegister(username, password);
                            }}
                        >
                            {page === 'login'
                                ? 'Login to Polar Lab'
                                : 'Register for Polar Lab'}
                        </button>
                        <button
                            className={`${styles.discordloginbtn} ${styles.button}`}
                            onClick={() => {
                                router.push('/oauth2/login/discord');
                            }}
                        >
                            Login with Discord
                        </button>
                    </div>
                </div>
                <div className={styles.right}>
                    <h2 className={styles.header}>By logging in you get:</h2>
                    <ul className={styles.benefits}>
                        <li className={styles.benefit}>
                            Access to the Polaris Dashboard
                        </li>
                        <li className={styles.benefit}>
                            Access to the Content Delivery Network
                        </li>
                        <li className={styles.benefit}>
                            Access to the Bug Tracker
                        </li>
                        <li className={styles.benefit}>Access to Polar Link</li>
                        <li className={styles.benefit}>Access to Polar +</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
