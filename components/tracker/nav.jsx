import styles from '../../src/css/tracker/nav.module.css';

export default function TrackerBar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbarlogo}>
                <img className={styles.logo} src='https://cdn.polarlab.app/src/img/polarlogo.png' alt='alt' />
                <a className={styles.header}>Polar Lab Bug Tracker</a>
            </div>
            <div className={styles.navlinks}>
                <a className={styles.navlink}>Home</a>
                <a className={styles.navlink}>Docs</a>
                <a className={styles.navlink}>Status</a>
            </div>
            <div className={styles.createnewcontainer}>
                <button className={styles.createnew}>Create New</button>
            </div>
        </div>
    );
}
