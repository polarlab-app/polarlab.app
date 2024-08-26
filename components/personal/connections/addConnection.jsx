'use client';
import styles from '@css/personal/addConnection.module.css';
import { useRouter } from 'next/navigation';

export default function AddConnection({ close }) {
    const connections = ['discord'];
    const router = useRouter();
    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1>Connect Accounts</h1>
                    <i className={`${styles.close} icon-xmark`} onClick={close}></i>
                </div>
                <div className={styles.connections}>
                    {connections
                        ? connections.map((connection, index) => (
                              <div key={index} className={styles.connection}>
                                  <i
                                      className={`${styles.icon} icon-${connection}`}
                                      onClick={() => router.push(`/oauth2/login/${connection}`)}
                                  ></i>
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
}
