import styles from '../src/css/core/navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.navlinkcontainer}>
                <Image
                    className={styles.logo}
                    src='https://cdn.polarlab.app/src/img/polarlogo.png'
                    alt='alt'
                    width='128'
                    height='128'
                />
                <Link className={styles.logolink} href='https://polarlab.app/' prefetch={false}>
                    Polar Lab
                </Link>
                <Link className={styles.navlink} href='/'>
                    Home
                </Link>
                <Link className={styles.navlink} href='https://docs.polarlab.app' prefetch={false}>
                    Docs
                </Link>
                <Link className={styles.navlink} href='/blog' prefetch={false}>
                    Blog
                </Link>
                <Link className={styles.navlink} href='/discord' prefetch={false}>
                    Discord
                </Link>
                <Link className={styles.polarplus} href='/plus' prefetch={false}>
                    Polar+
                </Link>
            </div>
            {/*(<div className={styles.borderBottom}></div>/*/}
        </nav>
    );
}
