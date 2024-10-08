'use client';
import styles from '@css/core/navbar.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import findUser from '@/lib/personal/findUser';
import { useState, useEffect } from 'react';

export default function NavBar() {
    const [active, setActive] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        async function load() {
            const user = JSON.parse(await findUser());
            setUser(user);
        }

        load();
    }, []);

    return (
        <nav className={`${styles.nav} ${active ? styles.active : null}`} id='nav'>
            <div className={styles.top}>
                <div className={styles.logocontainer}>
                    <Image
                        className={styles.logo}
                        src='https://cdn.polarlab.app/src/img/polarlogo.png'
                        alt='alt'
                        width='128'
                        height='128'
                    />
                    <Link className={styles.logolink} href='https://polarlab.app/'>
                        Polar Lab
                    </Link>
                </div>
                <div className={styles.navlinkcontainer}>
                    <Link className={styles.navlink} href='/'>
                        Home
                    </Link>
                    <Link className={styles.navlink} href='https://docs.polarlab.app' prefetch={false}>
                        Docs
                    </Link>
                    <Link className={styles.navlink} href='/blog'>
                        Blog
                    </Link>
                    <Link className={styles.navlink} href='/discord'>
                        Discord
                    </Link>
                </div>
                <div className={styles.icons}>
                    <i
                        className={`${styles.icon} icon-bars-light ${active == true ? null : styles.active}`}
                        onClick={() => setActive(true)}
                    ></i>
                    <i
                        className={`${styles.icon} icon-xmark-light ${active == true ? styles.active : null}`}
                        onClick={() => setActive(false)}
                    ></i>
                </div>
                <div className={styles.usercontainer}>
                    {user.c != 'r' ? (
                        <Link className={styles.button} href='/personal'>
                            My Account
                        </Link>
                    ) : (
                        <Link className={styles.button} href='/login'>
                            Login
                        </Link>
                    )}
                </div>
            </div>

            <div className={styles.menu}>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <a className={styles.link}>Home</a>
                    </li>
                    <li className={styles.listItem}>
                        <a className={styles.link}>Docs</a>
                    </li>
                    <li className={styles.listItem}>
                        <a className={styles.link}>Blog</a>
                    </li>
                </ul>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <a className={styles.link}>Status</a>
                    </li>
                    <li className={styles.listItem}>
                        <a className={styles.link}>Contact</a>
                    </li>
                    <li className={styles.listItem}>
                        <a className={styles.link}>Legal</a>
                    </li>
                </ul>
                <div className={styles.mobileButtonContainer}>
                    <a className={styles.mobileButton}>{user ? 'My Account' : 'Login'}</a>
                    <a className={styles.mobileButton}>Polaris Dashboard</a>
                </div>
            </div>
        </nav>
    );
}
