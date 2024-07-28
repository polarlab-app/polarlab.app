const { inputs } = require('@data/personal.json');
import styles from '@css/personal/buttonInput.module.css';

export default function ButtonInput({ type, onClick }) {
    return (
        <div className={styles.inputcontainer}>
            <div className={styles.inputtext}>
                <p className={styles.inputheader}>{inputs[type].name}</p>
                <p className={styles.inputdescription}>{inputs[type].description}</p>
            </div>
            <button onClick={onClick} className={styles.button}>
                {inputs[type].placeholder}
            </button>
        </div>
    );
}
