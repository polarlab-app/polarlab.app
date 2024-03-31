import styles from '@css/gdk/nav.module.css';
import Image from 'next/image';

export default function Nav() {
    return (
        <div className={styles.nav}>
            <Image
                className={styles.logo}
                alt='logo'
                width='512'
                height='512'
                src='https://cdn.polarlab.app/src/img/polarlogo.png'
            />
            <h1 className={styles.header}>Glorious Development Kit</h1>
            <div className={styles.option}>
                <Image
                    className={styles.optionimg}
                    alt='optionimage'
                    width='256'
                    height='256'
                    src='https://cdn.polarlab.app/src/img/polarlogo.png'
                />
                <p className={styles.optiontext}>Home</p>
            </div>
            <div className={styles.option}>
                <Image
                    className={styles.optionimg}
                    alt='optionimage'
                    width='256'
                    height='256'
                    src='https://cdn.polarlab.app/src/img/polarlogo.png'
                />
                <p className={styles.optiontext}>Updates</p>
            </div>
            <div className={styles.option}>
                <Image
                    className={styles.optionimg}
                    alt='optionimage'
                    width='256'
                    height='256'
                    src='https://cdn.polarlab.app/src/img/polarlogo.png'
                />
                <p className={styles.optiontext}>Discord</p>
            </div>
        </div>
    );
}
