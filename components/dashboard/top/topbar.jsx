import styles from '@css/dashboard/topbar.module.css';
const { topBar } = require('@data/dashboard.json');
import DiscardButton from './discardButton';
import SaveButton from './saveButton';

export default function TopBar({ type, showButtons, onDiscard, onSave }) {
    return (
        <div className={styles.dashboardtopbar}>
            <h1 className={styles.topbarheader}>
                {type.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
            </h1>
            <hr className={styles.topbardivider}></hr>
            <p className={styles.topbardescription}>{topBar[type]}</p>
            {showButtons && (
                <>
                    <DiscardButton onClick={onDiscard} />
                    <SaveButton onClick={onSave} />
                </>
            )}
        </div>
    );
}
