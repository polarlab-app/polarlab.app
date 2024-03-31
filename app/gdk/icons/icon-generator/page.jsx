'use client';

import styles from '@css/gdk/iconGenerator.module.css';
import { useState, useEffect } from 'react';
import Image, { getImageProps } from 'next/image';

export default function Page() {
    const [opacity, setOpacity] = useState('0.1');
    const [borderRadius, setBorderRadius] = useState('90');
    const [backgroundColor, setBackgroundColor] = useState('#fff');
    const [color, setColor] = useState('#fff');
    const [icon, setIcon] = useState('terminal');

    return (
        <div className={styles.main}>
            <div className={styles.workplace}>
                <div
                    className={styles.icon}
                    style={{ backgroundColor: backgroundColor, borderRadius: borderRadius + 'px', opacity: opacity }}>
                    <img
                        alt='icon'
                        src={`https://cdn.polarlab.app/src/icons/raw/${icon}.png`}
                        className={styles.iconimage}
                    />
                </div>
                <div
                    className={styles.icon}
                    style={{ backgroundColor: backgroundColor, borderRadius: borderRadius + 'px', opacity: opacity }}>
                    <img
                        alt='icon'
                        src={`https://cdn.polarlab.app/src/icons/raw/${icon}.png`}
                        className={styles.iconimage}
                    />
                    <div className={styles.overlay} style={{ backgroundColor: color }}></div>
                </div>
            </div>
            <div className={styles.controls}>
                <h2 className={styles.header}>Icon Controls</h2>
                <div className={styles.inputs}>
                    <div className={styles.inputcontainer}>
                        <p className={styles.inputlabel}>Border Radius</p>
                        <input
                            type='range'
                            className={styles.input}
                            min='0'
                            max='256'
                            value={borderRadius}
                            onChange={(e) => setBorderRadius(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.inputlabel}>Background Opacity</p>
                        <input
                            type='range'
                            className={styles.input}
                            min='0'
                            max='1'
                            step='0.01'
                            value={opacity}
                            onChange={(e) => setOpacity(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.inputlabel}>Icon Color</p>
                        <input type='text' className={styles.input} placeholder='Icon Color (hex)' value={color} />
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.inputlabel}>Background Color</p>
                        <input
                            type='text'
                            className={styles.input}
                            placeholder='Background Color (hex)'
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
