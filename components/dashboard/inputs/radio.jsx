'use client';
const { inputs } = require('@data/dashboard.json');
import styles from '@css/dashboard/radio.module.css';
import { useState } from 'react';

export default function RadioInput({ id, value, onChange }) {
    const [selectedValue, setSelectedValue] = useState(value);

    return (
        <div className={styles.container} onChange={onChange}>
            <div className={styles.textContainer}>
                <p className={styles.header}>{inputs[id].name}</p>
                <p className={styles.description}>{inputs[id].description}</p>
            </div>
            <div className={styles.options}>
                <label className={styles.option}>
                    <input
                        type='radio'
                        id='1'
                        value='static'
                        checked={selectedValue === 'static'}
                        onChange={(e) => setSelectedValue(e.target.value)}
                        name={id}
                        className={styles.input}
                    />
                    <span className={styles.toggle}>
                        <span className={styles.innertoggle}></span>
                    </span>
                    <span className={styles.label}>Static</span>
                </label>
                <label className={styles.option}>
                    <input
                        type='radio'
                        id='2'
                        value='range'
                        checked={selectedValue === 'range'}
                        onChange={(e) => setSelectedValue(e.target.value)}
                        name={id}
                        className={styles.input}
                    />
                    <span className={styles.toggle}>
                        <span className={styles.innertoggle}></span>
                    </span>
                    <span className={styles.label}>Range</span>
                </label>
            </div>
        </div>
    );
}