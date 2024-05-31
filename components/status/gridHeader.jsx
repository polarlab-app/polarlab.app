'use server';
import Image from 'next/image';
import styles from '@css/main/status.module.css';

export default async function GridHeader() {
    return (
        <div className={styles.gridheader}>
            <div className={styles.headercell}>
                <Image
                    alt='alt'
                    src='https://cdn.polarlab.app/src/icons/colorless/service_table.png'
                    className={styles.headericon}
                    width='128'
                    height='128'
                />
                <p className={styles.headertext}>Service</p>
            </div>
            <div className={styles.headercell}>
                <Image
                    alt='alt'
                    src='https://cdn.polarlab.app/src/icons/colorless/status_table.png'
                    className={styles.headericon}
                    width='128'
                    height='128'
                />
                <p className={styles.headertext}>Status</p>
            </div>
            <div className={styles.headercell}>
                <Image
                    alt='alt'
                    src='https://cdn.polarlab.app/src/icons/colorless/info_table.png'
                    className={styles.headericon}
                    width='128'
                    height='128'
                />
                <p className={styles.headertext}>Details</p>
            </div>
        </div>
    );
}
