'use client';
const { inputs } = require('@data/dashboard.json');
import styles from '@css/dashboard/singeInput.module.scss';
import { useState } from 'react';

export default function SingleInput({ id, value, onChange, width, exclude, icon, type, possibleOptions }) {
    const [selectedValue, setSelectedValue] = useState(value);

    return (
        <div className={`${styles.container} ${width == 'half' ? styles.half : null}`}>
            <div className={styles.header}>
                <p className={styles.heading}>{inputs[id].name}</p>
                <p className={styles.description}>{inputs[id].description}</p>
            </div>
            {type == 'checkbox' ? (
                <label
                    className={`${styles.checkboxContainer} ${width == 'half' ? styles.half : null}`}
                    onChange={(e) => {
                        setSelectedValue(e.target.checked);
                        onChange(id, e.target.checked);
                    }}
                >
                    <input id={id} type='checkbox' className={styles.hidden} checked={selectedValue}></input>
                    <span className={styles.checkboxToggle}>
                        <span className={styles.checkboxInnerToggle}></span>
                    </span>
                </label>
            ) : type == 'dropdown' ? (
                <></>
            ) : type == 'text' ? (
                <input
                    id={id}
                    type={type}
                    className={`${styles.textbox}  ${width == 'half' ? styles.half : null}`}
                    onChange={(e) => {
                        setSelectedValue(e.target.value);
                        onChange(e);
                    }}
                    value={text}
                    placeholder={inputs[id].placeholder}
                />
            ) : type == 'range' ? (
                <></>
            ) : type == 'radio' ? (
                <div className={`${styles.radioContainer} ${width == 'full' ? styles.full : null}`}>
                    {inputs[id].options.map((option, index) => (
                        <label className={styles.option} key={index}>
                            <input
                                type='radio'
                                id={index}
                                value={option}
                                checked={selectedValue === option}
                                onChange={(e) => {
                                    setSelectedValue(e.target.value);
                                    onChange(id, e.target.value);
                                }}
                                name={id}
                                className={`${styles.radioInput} ${styles.hidden}`}
                            />
                            <span className={styles.radioToggle}>
                                <span className={styles.radioInnerToggle}></span>
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
            ) : null}
        </div>
    );
}
