import { useState } from 'react';
import styles from '@css/dashboard/range.module.css';
export default function RangeInput({ id, value, onChange }) {
    const [selectedAmount, setSelectedAmount] = useState(value);

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <p className={styles.header}>{inputs[id].name}</p>
                <p className={styles.description}>{inputs[id].description}</p>
            </div>
        </div>
    );
}
