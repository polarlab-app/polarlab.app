'use client';
const { inputs } = require('@data/dashboard.json');
import styles from '@css/dashboard/textbox.module.css';
import { useState } from 'react';

export default function TextboxInput({ id, value, onChange, type }) {
    const [text, setText] = useState(value);

    return (
        <div className={styles.textboxcontainer}>
            <div className={styles.textboxtext}>
                <p className={styles.textboxheader}>{inputs[id].name}</p>
                <p className={styles.textboxdescription}>{inputs[id].description}</p>
            </div>
            <input
                id={id}
                type={type}
                className={styles.textbox}
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
