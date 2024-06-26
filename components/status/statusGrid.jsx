'use client';
import { useState, useEffect } from 'react';
import checkStatus from '@lib/status/checkStatus';
import styles from '@css/main/status.module.css';
import Image from 'next/image';

export default function StatusGrid() {
    const [statuses, setStatuses] = useState({});

    useEffect(() => {
        const statusFile = {
            pages: {
                Docs: 'https://docs.polarlab.app/',
                Blog: 'https://polarlab.app/blog',
                'Landing Pages': 'https://polarlab.app/',
                'Issue Tracker': 'https://polarlab.app/tracker',
                'Glorious Development Kit': 'https://polarlab.app/gdk',
                Status: 'https://polarlab.app/status',
            },
        };

        const fetchStatuses = async () => {
            const newStatuses = {};
            for (const [key, url] of Object.entries(statusFile.pages)) {
                const status = await checkStatus(url);
                newStatuses[key] = status;
            }
            setStatuses(newStatuses);
        };

        fetchStatuses();
    }, []);

    return (
        <>
            {Object.entries(statuses).map(([name, status]) => (
                <>
                    <div className={styles.gridcell} key={name}>
                        <p className={styles.gridtext}>{name}</p>
                    </div>
                    <div className={styles.gridcell} key={status}>
                        <Image
                            className={styles.cellicon}
                            alt={status}
                            src={`https://cdn.polarlab.app/src/icons/status/${
                                status === 'online' ? 'green' : 'gray'
                            }.png`}
                            width='64'
                            height='64'
                        />
                        <p className={`${styles.gridtext} ${styles[status]}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </p>
                    </div>
                    <div className={styles.gridcell} key={status + name}>
                        <p className={styles.gridtext}>
                            {status === 'online' ? 'All services Operational' : 'No Details'}
                        </p>
                    </div>
                </>
            ))}
        </>
    );
}
