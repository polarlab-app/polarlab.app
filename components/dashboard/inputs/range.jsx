import { useState } from 'react';
import styles from '@css/dashboard/range.module.css';
const { inputs } = require('@data/dashboard.json');

export default function RangeInput({ id, value, onChange }) {
    const [selectedAmount, setSelectedAmount] = useState(value);
    const optionsCount = Math.floor((inputs[id].max - inputs[id].min) / inputs[id].step) + 1;

    return (
        <div className={styles.container} onChange={onChange}>
            <div className={styles.textContainer}>
                <p className={styles.header}>{inputs[id].name}</p>
                <p className={styles.description}>{inputs[id].description}</p>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.values}>
                    {Array.from({ length: optionsCount }, (_, index) => {
                        const currentValue = inputs[id].min + index * inputs[id].step;
                        const isActive = currentValue == selectedAmount;
                        return (
                            <div className={`${styles.value} ${isActive ? styles.active : ''}`} key={index}>
                                {currentValue}
                                <hr className={styles.line} />
                            </div>
                        );
                    })}
                </div>
                <input
                    type='range'
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                    min={inputs[id].min}
                    max={inputs[id].max}
                    step={inputs[id].step}
                    className={styles.input}
                ></input>
            </div>
        </div>
    );
}
