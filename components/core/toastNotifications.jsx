'use client';
import React, { useState, useEffect } from 'react';
import styles from './toastNotifications.module.css';

let toastTrigger;

export const Toast = () => {
    const [header, setHeader] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [active, setActive] = useState(false);

    useEffect(() => {
        toastTrigger = (header, description, color) => {
            setHeader(header);
            setDescription(description);
            setColor(color);
            setActive(true);
            setTimeout(() => setActive(false), 5000);
        };
    }, []);

    return (
        <div className={`${styles.container} ${active ? `${styles.active}` : ''} ${styles[color]}`}>
            <div className={styles.infoContainer}>
                <i className={`${styles.icon} ${color === 'g' ? 'icon-check' : 'icon-xmark'} ${styles[color]}`}></i>
                <div className={styles.textContainer}>
                    <p className={styles.heading}>
                        {header}
                        <i className={`icon-xmark ${styles.xicon}`} onClick={() => setActive(false)}></i>
                    </p>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
            <div className={`${styles.progressBar} ${styles[color]}`}></div>
        </div>
    );
};

export const triggerToast = (header, description, color) => {
    if (toastTrigger) {
        toastTrigger(header, description, color);
    }
};
