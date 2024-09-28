'use client';
import { useState, useEffect } from 'react';
import login from '@lib/auth/sessionManagement/login';
import register from '@lib/auth/register';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '@css/login/login.module.css';
import validatePassword from '@lib/auth/validation/validatePassword';
import { triggerToast } from '@/components/core/toastNotifications';

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [page, setPage] = useState('login');
    const [passwordStrength, setPasswordStrength] = useState(0);

    const router = useRouter();

    useEffect(() => {
        const checkPasswordStrength = async () => {
            if (password) {
                const strength = await validatePassword(password);
                setPasswordStrength(strength);
            } else {
                setPasswordStrength(0);
            }
        };
        checkPasswordStrength();
    }, [password]);

    const handleLogin = async (username, password) => {
        if (!username || !password) {
            triggerToast('Failed To Login', 'Invalid login details entered', 'r');
            return;
        }
        const res = JSON.parse(await login(username, password));
        if (res) {
            triggerToast(res.h, res.d, res.c);
            if (res.s) {
                router.push('/personal');
                return;
            }
            setPassword(null);
        }
    };

    const handleRegister = async (username, email, password) => {
        const res = JSON.parse(await register(username, email, password));
        if (res) {
            triggerToast(res.h, res.d, res.c);
            if (res.s) {
                router.push('/personal');
            }
        }
    };

    const getStrengthColor = (strength) => {
        if (strength >= 3) return '#00e09c';
        if (strength === 2) return '#fdb822';
        if (strength === 1 || (strength === 0 && password)) return '#fe424d';
        return '#23252a';
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.header}>
                        <Image
                            src='https://cdn.polarlab.app/src/img/polarlogo.png'
                            alt='polarlogo'
                            className={styles.logo}
                            height={512}
                            width={512}
                            unoptimized={true}
                        />
                        <h1 className={styles.heading}>
                            {page === 'login' ? 'Login To Polar Lab' : 'Register To Polar Lab'}
                        </h1>
                    </div>
                    <div className={styles.inputs}>
                        {success ? <p className={styles.success}>{success}</p> : null}
                        {error ? <p className={styles.error}>ERROR: {error}</p> : null}
                        <div className={styles.inputcontainer}>
                            <p className={styles.inputlabel}>{page === 'login' ? 'Username or Email' : 'Username'}</p>
                            <input
                                type='text'
                                placeholder='Aertic'
                                onChange={(e) => setUsername(e.target.value)}
                                value={username ? username : ''}
                                className={styles.input}
                            ></input>
                        </div>
                        {page === 'register' ? (
                            <div className={styles.inputcontainer}>
                                <p className={styles.inputlabel}>Email</p>
                                <input
                                    type='text'
                                    placeholder='aertic@polarlab.app'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email ? email : ''}
                                    className={styles.input}
                                ></input>
                            </div>
                        ) : null}
                        <div className={styles.inputcontainer}>
                            <p className={styles.inputlabel}>Password</p>
                            <input
                                type='password'
                                placeholder='********'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password ? password : ''}
                                className={styles.input}
                            ></input>
                            {page === 'register' && (
                                <>
                                    <div className={styles.strengthbars}>
                                        {[1, 2, 3, 4].map((bar) => (
                                            <div
                                                key={bar}
                                                className={styles.strengthbar}
                                                style={{
                                                    backgroundColor:
                                                        passwordStrength >= bar
                                                            ? getStrengthColor(passwordStrength)
                                                            : undefined,
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                    <p
                                        className={styles.strengthtext}
                                        style={{ color: getStrengthColor(passwordStrength) }}
                                    >
                                        {passwordStrength === 0 && !password && 'Enter a password'}
                                        {passwordStrength === 0 && password && 'Weak password'}
                                        {passwordStrength === 1 && 'Weak password'}
                                        {passwordStrength === 2 && 'Fair password'}
                                        {passwordStrength === 3 && 'Strong password'}
                                        {passwordStrength === 4 && 'Very Strong password'}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.buttoncontainer}>
                        {page === 'login' ? (
                            <p className={styles.switchtext}>
                                Dont have an account? Register
                                <span
                                    className={styles.switchbutton}
                                    onClick={() => {
                                        setPage('register');
                                        setError('');
                                        setSuccess('');
                                    }}
                                >
                                    here
                                </span>
                            </p>
                        ) : (
                            <p className={styles.switchtext}>
                                Already have an account? Login
                                <span
                                    className={styles.switchbutton}
                                    onClick={() => {
                                        setPage('login');
                                        setError('');
                                        setSuccess('');
                                    }}
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
                                    : handleRegister(username, email, password);
                            }}
                        >
                            {page === 'login' ? 'Login to Polar Lab' : 'Register for Polar Lab'}
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
                        <li className={styles.benefit}>Access to the Polaris Dashboard</li>
                        <li className={styles.benefit}>Access to the Content Delivery Network</li>
                        <li className={styles.benefit}>Access to the Bug Tracker</li>
                        <li className={styles.benefit}>Access to Polar Link</li>
                        <li className={styles.benefit}>Access to Polar +</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
