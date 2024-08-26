import styles from '@css/personal/connections.module.css';
import findUser from '@/lib/personal/findUser';
import { useEffect, useState } from 'react';
import disconnect from '@/lib/personal/connections/disconnect';
import AddConnection from './addConnection';

export default function Connections() {
    const [connections, setConnections] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const account = JSON.parse(await findUser());
            setConnections(account.connections);
        };
        loadData();
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleDisconnect = async (connectionName) => {
        const res = await disconnect(connectionName);
        if (res == true) {
            setConnections((prevConnections) => prevConnections.filter((conn) => conn.name !== connectionName));
        } else {
        }
    };

    function close() {
        setShowModal(false);
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Connections</h1>
                <button className={styles.connect} onClick={() => setShowModal(true)}>
                    Add Connection
                </button>
            </div>
            <div className={styles.connections}>
                {connections
                    ? connections.map((connection, index) => (
                          <div key={index} className={styles.connection}>
                              <div className={styles.top}>
                                  <i className={`${styles.logo} icon-${connection.name}`}></i>
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
                      ))
                    : null}
            </div>
            {showModal ? <AddConnection close={close} /> : null}
        </div>
    );
}
