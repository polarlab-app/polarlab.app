import styles from '@css/tracker/bug.module.css';
export default function Page() {
    return (
        <div className={styles.main}>
            <div className={styles.bugtop}>
                <h1 className={styles.bugtitle}>Welcome to the Polar Lab Issue Tracker</h1>
                <div className={styles.category}>Introduction</div>
            </div>
            <hr className={styles.bugdivider}></hr>

            <div className={styles.bugbottom}>
                <div className={styles.bugbottomleft}>
                    <p className={styles.sectionheader}>Description</p>
                    <p className={styles.bugdescription}>Welcome to the Polar Lab Issue Tracker! </p>
                </div>
                <div className={styles.bugbottomdetails}>
                    <p className={styles.sectionheader}>Details</p>
                    <p className={styles.detailheader}>
                        Author: <span className={styles.detaildata}>Aertic</span>
                    </p>
                    <p className={styles.detailheader}>
                        Type: <span className={styles.detaildata}>Introduction</span>
                    </p>
                    <p className={styles.detailheader}>
                        Version: <span className={styles.detaildata}>V2</span>
                    </p>
                    <p className={styles.detailheader}>
                        Fix Version: <span className={styles.detaildata}>None</span>
                    </p>
                    <p className={styles.detailheader}>
                        Status: <span className={styles.detaildata}>Open</span>
                    </p>
                    <p className={styles.detailheader}>
                        Priority: <span className={styles.detaildata}>Master</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
