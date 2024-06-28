'use client';
const { inputs } = require('@data/dashboard.json');
import styles from '@css/dashboard/checkbox.module.css';
import { useState } from 'react';

export default function CheckboxInput({ type, value, onChange }) {
    const [isChecked, setIsChecked] = useState({ value });

    return (
        <div className={styles.toggleswitchcontainer} onChange={onChange}>
            <div className={styles.toggleswitchtext}>
                <p className={styles.toggleswitchheader}>{inputs[type].name}</p>
                <p className={styles.toggleswitchdescription}>{inputs[type].description}</p>
            </div>
            <label className={styles.togglecontainer}>
                <input
                    id={type}
                    type='checkbox'
                    className={styles.hidden}
                    onChange={() => setIsChecked(!isChecked)}
                    checked={isChecked}></input>
                <span className={styles.toggle}>
                    <span className={styles.innertoggle}></span>
                </span>
            </label>
        </div>
    );
}
