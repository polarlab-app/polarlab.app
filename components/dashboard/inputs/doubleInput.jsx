'use client';
import styles from '@css/dashboard/doubleInput.module.css';
import { useState, useEffect } from 'react';
const { inputs } = require('@data/dashboard.json');

export default function DoubleInput({ id, type, value, value2, onChange }) {
    const [selectedValue, setSelectedValue] = useState(value);
    const [selectedValue2, setSelectedValue2] = useState(value2);

    useEffect(() => {
        onChange(id, selectedValue, selectedValue2);
    }, [selectedValue, selectedValue2]);

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <p className={styles.header}>{inputs[id].name}</p>
                <p className={styles.description}>{inputs[id].description}</p>
            </div>
            <div className={styles.inputContainer}>
                {type === 'range' ? (
                    <div className={styles.rangeContainer}>
                        <div className={styles.values}>
                            {Array.from(
                                { length: Math.floor((inputs[id].max - inputs[id].min) / inputs[id].step) + 1 },
                                (_, index) => {
                                    const currentValue = inputs[id].min + index * inputs[id].step;
                                    const isActive = currentValue == selectedValue;
                                    return (
                                        <div className={`${styles.value} ${isActive ? styles.active : ''}`} key={index}>
                                            {currentValue}
                                            <hr className={styles.line} />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        <input
                            type='range'
                            value={selectedValue}
                            onChange={(e) => setSelectedValue(e.target.value)}
                            min={inputs[id].min}
                            max={inputs[id].max}
                            step={inputs[id].step}
                            className={styles.input}
                            id={id}
                        ></input>
                        <div className={styles.values}>
                            {Array.from(
                                { length: Math.floor((inputs[id].max - inputs[id].min) / inputs[id].step) + 1 },
                                (_, index) => {
                                    const currentValue = inputs[id].min + index * inputs[id].step;
                                    const isActive = currentValue == selectedValue2;
                                    return (
                                        <div className={`${styles.value} ${isActive ? styles.active : ''}`} key={index}>
                                            {currentValue}
                                            <hr className={styles.line} />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        <input
                            type='range'
                            value={selectedValue2}
                            onChange={(e) => setSelectedValue2(e.target.value)}
                            min={inputs[id].min}
                            max={inputs[id].max}
                            step={inputs[id].step}
                            className={styles.input}
                            id={id}
                        ></input>
                    </div>
                ) : (
                    <>
                        <div className={styles.textboxContainer}>
                            <label className={styles.label}>Minimum EXP</label>
                            <input
                                id={id}
                                className={styles.textbox}
                                onChange={(e) => {
                                    setSelectedValue(e.target.value);
                                }}
                                value={selectedValue}
                                placeholder={inputs[id].placeholder}
                            />
                        </div>
                        <div className={styles.textboxContainer}>
                            <label className={styles.label}>Maximum EXP</label>
                            <input
                                id={id}
                                className={styles.textbox}
                                onChange={(e) => {
                                    setSelectedValue2(e.target.value);
                                }}
                                value={selectedValue2}
                                placeholder={inputs[id].placeholder2}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
