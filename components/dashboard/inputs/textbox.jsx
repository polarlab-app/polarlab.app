'use client';
const { inputs } = require('@data/dashboard.json');
import styles from '@css/dashboard/textbox.module.css';
import { useState } from 'react';

export default function TextboxInput({ id, value, onChange, type, width }) {
    const [text, setText] = useState(value);

    return (
        <div className={`${styles.textboxContainer} ${width == 'half' ? styles.half : null}`}>
            <div className={`${styles.textboxText}  ${width == 'half' ? styles.half : null}`}>
                <p className={styles.textboxHeader}>{inputs[id].name}</p>
                <p className={styles.textboxDescription}>{inputs[id].description}</p>
            </div>
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
        </div>
    );
}
