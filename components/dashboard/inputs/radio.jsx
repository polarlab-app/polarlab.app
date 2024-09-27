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
                {inputs[id].options.map((option, index) => (
                    <label className={styles.option} key={index}>
                        <input
                            type='radio'
                            id={index}
                            value={option}
                            checked={selectedValue === option}
                            onChange={(e) => setSelectedValue(e.target.value)}
                            name={id}
                            className={styles.input}
                        />
                        <span className={styles.toggle}>
                            <span className={styles.innertoggle}></span>
                        </span>
                        <span className={styles.label}>
                            {option
                                .split(' ')
                                .map((word, index) =>
                                    index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase()
                                )
                                .join('')
                                .replace(/([a-z])([A-Z])/g, '$1 $2')}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}
