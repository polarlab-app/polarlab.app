'use server';
import styles from '@css/core/navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import findUser from '@/lib/personal/findUser';

export default async function NavBar() {
    const user = JSON.parse(await findUser());

    return (
        <nav className={styles.nav} id='nav'>
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
        </nav>
    );
}
