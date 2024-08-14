import styles from '@css/personal/createApp.module.css';

export default function CreateApp({ closeButton }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <div className={styles.modalheader}>
                    <h2 className={styles.header}>Create New App</h2>
                    <p className={styles.close} onClick={closeButton}>
                        Close
                    </p>
                </div>
                <div className={styles.modalbody}>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>App Name</p>
                        <input type='text' placeholder='App Name' className={styles.input} />
                    </div>
                </div>
                <button className={styles.create}>Create</button>
            </div>
        </div>
    );
}
