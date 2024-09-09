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
                <i className={`${styles.icon} icon-grid-2`}></i>
                <div className={styles.textContainer}>
                    <p className={styles.heading}>{header}</p>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
            <div className={styles.progressBar}></div>
        </div>
    );
};

export const triggerToast = (header, description, color) => {
    if (toastTrigger) {
        toastTrigger(header, description, color);
    }
};
