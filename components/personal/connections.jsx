import styles from '@css/personal/connections.module.css';
import findUser from '@/lib/personal/findUser';
import { useEffect } from 'react';

export default function Connections() {
    useEffect(() => {
        const loadData = async () => {
            const account = JSON.parse(await findUser());
            console.log(account);
        };
        loadData();
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.connections}>
                <div className={styles.connection}>
                    <div className={styles.top}>
                        <i className='icon-grid-2'></i>
                        <p className={styles.name}>Google</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
