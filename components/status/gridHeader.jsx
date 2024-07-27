'use server';
import Image from 'next/image';
import styles from '@css/main/status.module.css';

export default async function GridHeader() {
    return (
        <div className={styles.gridheader}>
            <div className={styles.headercell}>
                <i className={`icon-grid-2 ${styles.headericon}`}></i>
                <p className={styles.headertext}>Service</p>
            </div>
            <div className={styles.headercell}>
                <i className={`icon-signal-bars ${styles.headericon}`}></i>

                <p className={styles.headertext}>Status</p>
            </div>
            <div className={styles.headercell}>
                <i className={`icon-circle-info ${styles.headericon}`}></i>

                <p className={styles.headertext}>Details</p>
            </div>
        </div>
    );
}
