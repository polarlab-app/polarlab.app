import styles from '@css/core/loading.module.css';

export default function Loading() {
    return (
        <div className={styles.loading}>
            <p>Loading content...</p>
            <p>Please be patient while load the content for you!</p>
        </div>
    );
}
