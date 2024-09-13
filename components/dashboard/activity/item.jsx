import styles from '@css/dashboard/activity.module.css';

export default function Item(props) {
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    };

    return (
        <>
            <div key={props.key} className={styles.item}>
                <div className={styles.itemHeader}>
                    <p className={styles.itemHeading}>{props.item.action}</p>
                    <p className={styles.itemID}>({props.item.id})</p>
                </div>
                <div className={styles.info}>
                    <div className={styles.ids}>
                        <p className={styles.infoItem}>Date: {formatDate(props.item.date)}</p>
                        <p className={styles.infoItem}>
                            Author: {props.item.users.authorUsername}{' '}
                            <span className={styles.id}>({props.item.users.authorID})</span>
                        </p>
                        <p className={styles.infoItem}>
                            Affected: {props.item.users.offenderUsername}{' '}
                            <span className={styles.id}>({props.item.users.offenderID})</span>
                        </p>
                    </div>
                    <div className={styles.details}>
                        <p className={styles.infoItem}>
                            Reason: <span className={styles.id}>{props.item.details.reason}</span>
                        </p>
                        <p className={styles.infoItem}>
                            Notes: <span className={styles.id}>{props.item.details.note}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.divider}></div>
        </>
    );
}
