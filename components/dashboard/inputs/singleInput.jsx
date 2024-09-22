'use client';
const { inputs } = require('@data/dashboard.json');
import styles from '@css/dashboard/singeInput.module.scss';
import { useState } from 'react';

export default function SingleInput({ id, value, onChange, width, exclude, icon, type, possibleOptions }) {
    const [isChecked, setIsChecked] = useState(value || false);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.heading}>{inputs[id].name}</p>
                <p className={styles.description}>{inputs[id].description}</p>
            </div>
            {type == 'checkbox' ? (
                <label className={styles.checkboxContainer}>
                    <input
                        id={id}
                        type='checkbox'
                        className={styles.hidden}
                        onChange={(e) => {
                            e.preventDefault();
                            setIsChecked(!isChecked);
                            onChange(id, !isChecked);
                        }}
                        checked={isChecked}
                    ></input>
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
                        setText(e.target.value);
                        onChange(e);
                    }}
                    value={text}
                    placeholder={inputs[id].placeholder}
                />
            ) : type == 'range' ? (
                <></>
            ) : type == 'radio' ? (
                <></>
            ) : null}
        </div>
    );
}
