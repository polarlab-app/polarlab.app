'use client';
const { inputs } = require('@data/dashboard.json');
import styles from '@css/dashboard/textbox.module.css';
import { useState } from 'react';

export default function TextboxInput({ type, value, onChange }) {
    const [text, setText] = useState(value);

    return (
        <div className={styles.textboxcontainer}>
            <div className={styles.textboxtext}>
                <p className={styles.textboxheader}>{inputs[type].name}</p>
                <p className={styles.textboxdescription}>{inputs[type].description}</p>
            </div>
            <input
                id={type}
                type='text'
                className={styles.textbox}
                onChange={(e) => {
                    setText(e.target.value);
                    onChange(e);
                }}
                value={text}
                placeholder={inputs[type].placeholder}
            />
        </div>
    );
}
