import styles from '../../src/css/main/status.module.css';
import '../../src/css/main/status.global.css';

export default function Page() {
    return (
        <>
            <div className='stars'></div>
            <div className={styles.main}>
                <table className={styles.statustable}>
                    <tbody>
                        <tr className={styles.tablerow}>
                            <th className={styles.tablehead}>
                                <img
                                    alt='alt'
                                    className={styles.headicon}
                                    src='https://cdn.polarlab.app/src/icons/colorless/service_table.png'
                                />
                                Service
                            </th>
                            <th className={styles.tablehead}>
                                <img
                                    alt='alt'
                                    className={styles.headicon}
                                    src='https://cdn.polarlab.app/src/icons/colorless/status_table.png'
                                />
                                Status
                            </th>
                            <th className={styles.tablehead}>
                                <img
                                    alt='alt'
                                    className={styles.headicon}
                                    src='https://cdn.polarlab.app/src/icons/colorless/info_table.png'
                                />
                                Details
                            </th>
                        </tr>
                        <tr className='table-row'>
                            <td className={styles.tablerow}>Polaris V2</td>
                            <td className={`${styles.tablerow} ${styles.beta}`}>
                                <img
                                    alt='alt'
                                    className={styles.rowicon}
                                    src='https://cdn.polarlab.app/src/icons/status/indigo.png'
                                />
                                Beta Testing
                            </td>
                            <td className={styles.tablerow}>PTB Accessible</td>
                        </tr>
                        <tr className='table-row'>
                            <td className={styles.tablerow}>Polar MC</td>
                            <td className={`${styles.tablerow} ${styles.online}`}>
                                <img
                                    alt='alt'
                                    className={styles.rowicon}
                                    src='https://cdn.polarlab.app/src/icons/status/green.png'
                                />
                                Online
                            </td>
                            <td className={styles.tablerow}>Access Allowed </td>
                        </tr>
                        <tr className='table-row'>
                            <td className={styles.tablerow}>Glorious Development Kit</td>
                            <td className={`${styles.tablerow} ${styles.minor}`}>
                                <img
                                    alt='alt'
                                    className={styles.rowicon}
                                    src='https://cdn.polarlab.app/src/icons/status/gold.png'
                                />
                                Minor Issues
                            </td>
                            <td className={styles.tablerow}>All services Operational</td>
                        </tr>
                        <tr className='table-row'>
                            <td className={styles.tablerow}>Polaris V1</td>
                            <td className={`${styles.tablerow} ${styles.offline}`}>
                                <img
                                    alt='alt'
                                    className={styles.rowicon}
                                    src='https://cdn.polarlab.app/src/icons/status/gray.png'
                                />
                                Offline
                            </td>
                            <td className={styles.tablerow}>None</td>
                        </tr>
                    </tbody>
                </table>
                <table className={styles.statustable}>
                    <tbody>
                        <tr className='table-row'>
                            <th className={styles.tablehead}>
                                <img
                                    alt='alt'
                                    className={styles.headicon}
                                    src='https://cdn.polarlab.app/src/icons/colorless/service_table.png'
                                />
                                Services
                            </th>
                            <th className={styles.tablehead}>
                                <img
                                    alt='alt'
                                    className={styles.headicon}
                                    src='https://cdn.polarlab.app/src/icons/colorless/status_table.png'
                                />
                                Status
                            </th>
                            <th className={styles.tablehead}>
                                <img
                                    alt='alt'
                                    className={styles.headicon}
                                    src='https://cdn.polarlab.app/src/icons/colorless/info_table.png'
                                />
                                Details
                            </th>
                        </tr>
                        <tr className='table-row'>
                            <td className={styles.tablerow}>Docs</td>
                            <td className={`${styles.tablerow} ${styles.online}`}>
                                <img
                                    alt='alt'
                                    className={styles.rowicon}
                                    src='https://cdn.polarlab.app/src/icons/status/green.png'
                                />
                                Online
                            </td>
                            <td className={styles.tablerow}>All Services Operational</td>
                        </tr>
                        <tr className='table-row'>
                            <td className={styles.tablerow}>Blog</td>
                            <td className={`${styles.tablerow} ${styles.online}`}>
                                <img
                                    alt='alt'
                                    className={styles.rowicon}
                                    src='https://cdn.polarlab.app/src/icons/status/green.png'
                                />
                                Online
                            </td>
                            <td className={styles.tablerow}>All Services Operational</td>
                        </tr>
                        <tr className='table-row'>
                            <td className={styles.tablerow}>Landing Page</td>
                            <td className={`${styles.tablerow} ${styles.minor}`}>
                                <img
                                    alt='alt'
                                    className={styles.rowicon}
                                    src='https://cdn.polarlab.app/src/icons/status/gold.png'
                                />
                                Minor Issues
                            </td>
                            <td className={styles.tablerow}>Incomplete Text</td>
                        </tr>
                        <tr className='table-row'>
                            <td className={styles.tablerow}>Bug Tracker</td>
                            <td className={`${styles.tablerow} ${styles.offline}`}>
                                <img
                                    alt='alt'
                                    className={styles.rowicon}
                                    src='https://cdn.polarlab.app/src/icons/status/gray.png'
                                />
                                Offline
                            </td>
                            <td className={styles.tablerow}>Reconstruction in Progress</td>
                        </tr>
                        <tr className='table-row'>
                            <td className={styles.tablerow}>Glorious Development Kit</td>
                            <td className={`${styles.tablerow} ${styles.offline}`}>
                                <img
                                    alt='alt'
                                    className={styles.rowicon}
                                    src='https://cdn.polarlab.app/src/icons/status/gray.png'
                                />
                                Offline
                            </td>
                            <td className={styles.tablerow}>Reconstruction in Progress</td>
                        </tr>
                        <tr className='table-row'>
                            <td className={styles.tablerow}>Status Page</td>
                            <td className={`${styles.tablerow} ${styles.online}`}>
                                <img
                                    alt='alt'
                                    className={styles.rowicon}
                                    src='https://cdn.polarlab.app/src/icons/status/green.png'
                                />
                                Online
                            </td>
                            <td className={styles.tablerow}>Monitoring</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
