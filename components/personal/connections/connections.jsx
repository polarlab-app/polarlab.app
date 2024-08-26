import styles from '@css/personal/connections.module.css';
import findUser from '@/lib/personal/findUser';
import { useEffect, useState } from 'react';
import disconnect from '@/lib/personal/disconnect';

export default function Connections() {
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const account = JSON.parse(await findUser());
            setConnections(account.connections);
        };
        loadData();
    }, [connections]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleDisconnect = async (connectionName) => {
        await disconnect(connectionName);
        setConnections((prevConnections) => prevConnections.filter((conn) => conn.name !== connectionName));
    };

    return (
        <div className={styles.main}>
            <div className={styles.connections}>
                {connections.map((connection, index) => (
                    <div key={index} className={styles.connection}>
                        <div className={styles.top}>
                            <i className={`${styles.icon} icon-${connection.name}`}></i>
                            <p className={styles.name}>{capitalizeFirstLetter(connection.name)}</p>
                            <button className={styles.button} onClick={() => handleDisconnect(connection.name)}>
                                Disconnect
                            </button>
                        </div>
                        <div className={styles.permissions}>
                            <p className={styles.info}>This connection allows us to:</p>
                            <ul className={styles.list}>
                                <li className={styles.item}>
                                    <i className={`${styles.icon} icon-check`}></i>
                                    Access your profile
                                </li>
                                <li className={styles.item}>
                                    <i className={`${styles.icon} icon-check`}></i>
                                    Access your guilds
                                </li>
                                <li className={styles.item}>
                                    <i className={`${styles.icon} icon-check`}></i>
                                    Access your email
                                </li>
                            </ul>
                        </div>
                        <p className={styles.date}>Date Added: {formatDate(connection.date)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
