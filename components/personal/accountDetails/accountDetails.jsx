'use client';
import styles from '@css/personal/accountDetails.module.css';

export default function AccountDetails() {
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Account Details</h1>
                <button className={styles.button}>Save Changes</button>
            </div>
            <div className={styles.account}>
                <div className={styles.inputs}>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>Username</p>
                        <input type='text' placeholder='Username' />
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>Email</p>
                        <input type='text' placeholder='Email' />
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>Password</p>
                        <input type='password' placeholder='Password' />
                    </div>
                </div>
            </div>
        </div>
    );
}
