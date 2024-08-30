import { useState } from 'react';
import styles from '@css/dashboard/range.module.css';
const { inputs } = require('@data/dashboard.json');

export default function RangeInput({ id, value, onChange }) {
    const [selectedAmount, setSelectedAmount] = useState(value);

    return (
        <div className={styles.container} onChange={onChange}>
            <div className={styles.textContainer}>
                <p className={styles.header}>{inputs[id].name}</p>
                <p className={styles.description}>{inputs[id].description}</p>
            </div>
            <div className={styles.input}>
                <div className={styles.values}></div>
                <input
                    type='range'
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                    min={inputs[id].min}
                    max={inputs[id].max}
                    step={inputs[id].step}
                ></input>
            </div>
        </div>
    );
}
