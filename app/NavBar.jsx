'use server';
import styles from '@css/core/navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import findUser from '@/lib/personal/findUser';

export default async function NavBar() {
    const username = cookies().get('username');
    const token = cookies().get('accountToken');
    let user;
    if (token) {
        user = await findUser(token.value);
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.navlinkcontainer}>
                <Image
                    className={styles.logo}
                    src="https://cdn.polarlab.app/src/img/polarlogo.png"
                    alt="alt"
                    width="128"
                    height="128"
                />
                <Link
                    className={styles.logolink}
                    href="https://polarlab.app/"
                    prefetch={false}
                >
                    Polar Lab
                </Link>
                <Link className={styles.navlink} href="/">
                    Home
                </Link>
                <Link
                    className={styles.navlink}
                    href="https://docs.polarlab.app"
                    prefetch={false}
                >
                    Docs
                </Link>
                <Link className={styles.navlink} href="/blog" prefetch={false}>
                    Blog
                </Link>
                <Link
                    className={styles.navlink}
                    href="/discord"
                    prefetch={false}
                >
                    Discord
                </Link>
                {user ? (
                    <div className={styles.welcome}>
                        <img
                            alt="pfp"
                            className={styles.pfp}
                            src={
                                user.pfp ? user.pfp : 'https://placehold.co/128'
                            }
                        />
                        <div className={styles.text}>
                            <p className={styles.welcometext}>Welcome Back,</p>
                            <Link
                                className={styles.personal}
                                href="/personal"
                                prefetch={false}
                            >
                                {username.value}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <Link
                        className={styles.button}
                        href="/login"
                        prefetch={false}
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
