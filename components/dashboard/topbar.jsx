import styles from '@css/dashboard/topbar.module.css';
const { topBar } = require('@data/dashboard.json');

export default function TopBar({ type, children }) {
    return (
        <div className={styles.dashboardtopbar}>
            <h1 className={styles.topbarheader}>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            <hr className={styles.topbardivider}></hr>
            <p className={styles.topbardescription}>{topBar[type]}</p>
            {children}
        </div>
    );
}
